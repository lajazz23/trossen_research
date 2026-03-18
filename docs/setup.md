# Setup for GR00T-N1.5 & Trossen Lerobot
## Installing the repo
First, clone the repository.

```bash
git clone https://github.com/NVIDIA/Isaac-GR00T
cd Isaac-GR00T
```

Then create a conda environment for it.

```bash
conda create -n groble python=3.10 -y
conda activate groble
```

First, let's setup the trosse_lerobot repo. Then, install the base dependencies. I used `uv` to download all the dependencies.

```bash
git clone https://github.com/TrossenRobotics/lerobot_trossen.git
cd lerobot_trossen && uv pip install -e .
```

```bash
# return to the Isaac-GR00T folder
cd ..
pip install --upgrade setuptools
pip install -e .[base]
```

Now it gets tricky, since my workstation is new, it's gpu architecture is sm120. I uninstall the torch from the dependencies and instead install the nightly build of PyTorch for CUDA 12.8.

```bash
pip uninstall torch torchvision
pip3 install --pre torch torchvision --index-url https://download.pytorch.org/whl/nightly/cu128
```
Then I install pytorch3d next.
```bash
export TORCH_CUDA_ARCH_LIST="12.0"
pip install --no-build-isolation "git+https://github.com/facebookresearch/pytorch3d.git"
```

Then reinstall the gr00t package, as well as flash-attn.

```bash
pip install -e .[base] --no-deps
pip install --no-build-isolation flash-attn
pip install numpy==1.23.5
```

## Starting Their Demos

They begin with the quick start, where you can download their model checkpoint and run inference via client-server.

```bash
python scripts/inference_service.py --model-path nvidia/GR00T-N1.5-3B --server
```

Open another terminal and start the client. This pulls the model's response (action) from the server after giving it an observation.

```bash
python scripts/inference_service.py  --client
```
### Load the dataset
Next, run the script to load this dataset, which will start a pop-up showing the frames.

```bash
python scripts/load_dataset.py --dataset-path ./demo_data/robot_sim.PickNPlace
```
### Run inference

I installed [TensorRT](https://developer.nvidia.com/tensorrt/download/10x) as a `tar` file.

```bash
version="10.x.x.x"
arch=$(uname -m)
cuda="cuda-x.x"
tar -xzvf TensorRT-10.14.1.48.Linux.x86_64-gnu.cuda-12.9.tar.gz

ls TensorRT-10.14.1.48
export LD_LIBRARY_PATH=TensorRT-10.14.1.48/lib:$LD_LIBRARY_PATH

cd TensorRT-10.14.1.48/python
python3 -m pip install tensorrt-*-cp310-none-linux_x86_64.whl
```

Now deploy the policy... This step is where the trained model is converted to ONNX (Open Neural Network Exchange), optimized with TensorRT, and then run for inference.

```bash
# back in the Isaacc-GR00T folder
python deployment_scripts/export_onnx.py
bash deployment_scripts/build_engine.sh
python deployment_scripts/gr00t_inference.py --inference-mode=tensorrt
```

### Finetune

Run this to fine-tune:

```bash
python scripts/gr00t_finetune.py --dataset-path ./demo_data/robot_sim.PickNPlace --num-gpus 1
```

![Graph](assets/grootgraphs.png)

## Troubleshooting

**Error:** 

```bash
raise InvalidSchemaError from e
pydantic._internal._generate_schema.InvalidSchemaError
```

**Solution:** Ensure `NumPy` is compatabile with `numpydantic` and `Pydantic`. I did the following because I had NumPy v1.26.4.

```bash
# first check your NumPy version
python -c "import numpy; print(numpy.__version__)"

pip install pydantic
pip install --upgrade numpydantic
cd ~/IsaacGR00T 

# rebuild gr00t
pip install -e .[base] --no-deps
```
------------------------------------------------------------------------
**Error:**

```
zmq.error.ZMQError: Address already in use (addr='tcp://*:<port>')
```
**Solution:** Use another port.

```bash
python scripts/inference_service.py --model-path nvidia/GR00T-N1.5-3B --server --port <port>

# You will have to also point the client to the adjusted port
python scripts/inference_service.py --client --port <port>

```
------------------------------------------------------------------------

**Error:**

```bash
RuntimeError: Server error: CUDA error: no kernel image is available for execution on the device
```

**Solution:** Download [pre-built flash-attn wheels](https://github.com/Zarrac/flashattention-blackwell-wheels-whl-ONLY-5090-5080-5070-5060-flash-attention-/releases/tag/FlashAttention).

------------------------------------------------------------------------

**Error:**

```bash
raise ImportError("torchcodec is not available.")
ImportError: torchcodec is not available.
```

**Solution:** My issue was that [torchcodec](https://github.com/meta-pytorch/torchcodec?tab=readme-ov-file#installing-torchcodec) was not compatible with my PyTorch version.

```bash
pip install torchcodec==0.5.0
```

----
Made by Jasmin Lin.