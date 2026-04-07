# Setup for Incorporating Pi0/0.5 with Trossen MobileAI 

Trossen Robotics has their own [fork](https://github.com/trossenRobotics/openpi) of the OpenPi repository. The recorded dataset **must be Lerobot v2.1** to be compatible with Pi0/0.5 training.

An example dataset folder structure is as follows:

```
.
├── data
│   └── chunk-000
│       ├── episode_000000.parquet
│       └── ...
├── meta
│   ├── episodes.jsonl
│   ├── episodes_stats.jsonl
│   ├── info.json
│   ├── stats.json
│   └── tasks.jsonl
└── videos
    └── chunk-000
        ├── observation.images.cam_high
        │   ├── episode_000000.mp4
        │   └── ...
        ├── observation.images.cam_left
        │   ├── episode_000000.mp4
        │   └── ...
        └── observation.images.cam_right
            ├── episode_000000.mp4
            └── ...
```

Next, navigate to `openpi/src/openpi/training/config.py`. Here we will be defining the data config for the model. 

```python
    TrainConfig(
        name={data config name},
        model=pi0_config.Pi0Config(pi05=True),
        data=LeRobotAlohaDataConfig(
            use_delta_joint_actions=False,
            adapt_to_pi=False,
            repo_id={local dataset},
            assets=AssetsConfig(
                assets_dir="gs://openpi-assets/checkpoints/pi05_base/assets",
                asset_id="trossen",
            ),
            default_prompt="grab and handover the red cube",
            repack_transforms=_transforms.Group(
                inputs=[
                    _transforms.RepackTransform(
                        {
                            "images": {
                                "cam_high": "observation.images.cam_high",
                                "cam_left_wrist": "observation.images.cam_left",
                                "cam_right_wrist": "observation.images.cam_right",
                            },
                            "state": "observation.state",
                            "actions": "action",
                        }
                    )
                ]
            ),
        ),
  
        weight_loader=weight_loaders.CheckpointWeightLoader("gs://openpi-assets/checkpoints/pi05_base/params"),
        num_train_steps=20_000,
        batch_size=4,
    ),
```
In the example above, I'm passing a local dataset, but natively Hugging Face datasets are supported.


## Fine-tuning on Our Dataset

To begin inference, run:

```bash
XLA_PYTHON_CLIENT_MEM_FRACTION=0.9 uv run --no-sync scripts/train.py {config_name} --exp-name={name} --overwrite
```

Here's an example of good training:


```
XLA_PYTHON_CLIENT_MEM_FRACTION=0.9 uv run --no-sync scripts/train.py pi05_handover_board --exp-name=board --overwrite

```
## Troubleshooting

### Dataset Version
If your dataset is v3.0 for Lerobot, you can do the following:

```
git clone --branch v0.4.4 https://github.com/huggingface/lerobot.git
```
Then, you can check out this [user's code](https://github.com/huggingface/lerobot/pull/2109/changes/8fd8ba739d74c7500a67f59653ad9ee09b4da25d) for downgrading the dataset from v3.0 to v2.1.

