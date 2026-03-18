# Setup for Incorporating GR00T-N1.5 with Trossen MobileAI 
## Fine-tuning on Our Dataset
GR00T-N1.5 does not have pre-defined configs for robots like the Trossen MobileAI, where it is not a full humanoid yet it has bimanual arms that have end-effector control. Thus, we will have to customize our script.

Let's understand the format of the recorded data first. The Trossen MobileAI records its data in lerobot format, where it outputs `parquet` files containing the robot state and action vectors. Both arms' joints and velocities are already concatenated, with the grippers inside the flattened vector. This means that both arms are logged into one vector.

This is great, because we can treat the action and state as one modality, without need to split it by left or right arms. The format of the dataset is:

```json
# Action (16-D)
0  linear_vel
1  angular_vel
2  left_joint_0
3  left_joint_1
4  left_joint_2
5  left_joint_3
6  left_joint_4
7  left_joint_5
8  left_joint_6
9  right_joint_0
10 right_joint_1
11 right_joint_2
12 right_joint_3
13 right_joint_4
14 right_joint_5
15 right_joint_6

# State (19-D)
0  odom_x
1  odom_y
2  odom_theta
3  linear_vel
4  angular_vel
5–11  left_joint_0 ... left_joint_6
12–18 right_joint_0 ... right_joint_6

# Cameras
observation.images.cam_high
observation.images.cam_left_wrist
observation.images.cam_right_wrist
```

Now here's a problem--like most of the VLAs I've worked with, GR00T-N1.5 has a specific way to read the data, and unfortunately, our dataset isn't fully readable by it yet.

Here are the changes I've done:

- Add a custom config file for the Trossen MobileAI robot to the [data_config.py](https://github.com/lajazz23/MobileAI-GR00TN1.5/blob/main/gr00t/experiment/data_config.py) file.  
    1. As shown above, the cameras are conventionally named "observation.images...", but it must be changed. 
    2. I removed all instances of that, so that only "cam_..." was left. This includes renaming the video folders in the dataset.
    
- Added a `modality.json` file to the `dataset/meta` folder from our dataset. Something like this:
```json
{
  "state": {
    "observation": {
      "start": 0,
      "end": 19,
      "fields": {
        "odom_x": {
          "start": 0,
          "end": 1,
          "dtype": "float32"
        },
        "odom_y": {
          "start": 1,
          "end": 2,
          "dtype": "float32"
        },
        "odom_theta": {
          "start": 2,    
          "end": 3,
          "dtype": "float32",
          "range": [-3.1416, 3.1416]
        },

        "linear_vel": {
          "start": 3,
          "end": 4,
          "dtype": "float32"
        },
        "angular_vel": {
          "start": 4,
          "end": 5,
          "dtype": "float32"
        },

        "left_joint_0": {
          "start": 5,
          "end": 6,
          "dtype": "float32",
          "range": [-3.1416, 3.1416]
        },...
        }
     } 
 },

  "action": {
    "action": {
      "start": 0,
      "end": 16,
      "fields": {
        "linear_vel": {
          "start": 0,
          "end": 1,
          "absolute": true,
          "dtype": "float32"
        },
        "angular_vel": {
          "start": 1,
          "end": 2,
          "absolute": true,
          "dtype": "float32"
        },

        "left_joint_0": {
          "start": 2,
          "end": 3,
          "absolute": true,
          "dtype": "float32",
          "range": [-3.1416, 3.1416]
        },...
          }
     }
},

  "video": {
    "cam_high": {
      "original_key": "cam_high"
    },
    "cam_left_wrist": {
      "original_key": "cam_left_wrist"
    },
    "cam_right_wrist": {
      "original_key": "cam_right_wrist"
    }
  },

  "annotation": {
    "human.task_description": {
      "original_key": "task_index"
    }
  }
}
```

- Must make sure `info.json` matches `modality.json`.


## Deploying on the MobileAI (Software)

Let's now try to work on getting the policy deployed on the actual robot. Since GR00T-N1.5 uses a client-server setup, we need to tweak it to be able to send the inference to the robot configurations.

The documentation mentions 2 client modes--**ZMQ** and **HTTPS**.
- ZMQ is lightweight and fast, making it  good for local network.
- HTTP is better for connecting remotely to the robot.

Let's use ZMQ, since we want to connect to the robot directly.

```

```




## Comparison to OpenPi

Obviously GR00T-N1.5 and OpenPi have thier own formatting. In the Trossen documentation, OpenPi uses WebSocket as the server, whereas for GR00T-N1.5 we are using ZMQ. OpenPi also recieves action chunks eather than single actions, and supports temporal ensembling.

### Troubleshooting

**Error:** Not enought memory (dependent on size of dataset).

**Solution:** Change the batch size in `Isaac-GR00T/scripts/gr00t_finetune.py` to a smaller number.

### Other Stuff

If you're curious, these are the flags/options and arguments for `gr00t_finetune.py`. You can find these if you run `python gr00t_finetune.py --help`.

**--dataset-path** (STR) path to the dataset

**--output-dir** (STR) directory to save the model checkpoint

**--data-config** (STR) the data config for training      

**--batch-size** (INT) batch size for training, which is dependent on dataset size and GPU capability

**--max-steps** (INT) max training steps

**--num-gpus** (INT) number of GPUs used

**--save-steps** (INT) factor of which it saves the checkpoints

**--base-model-path** (STR) path to model to be fine-tuned on

**--tune-llm /--no-tune-llm**  fine-tune language model backbone

**--tune-visual / --no-tune-visual** for if the visual data is different from pre-training data

**--tune-projector / --no-tune-projector** helps align the embodiment-specific action and state spaces

**--tune-diffusion-model /--no-tune-diffusion-model** to finetune the diffusion model

**--resume / --no-resume** resume from a checkpoint

**--learning-rate** (FLOAT) learning rate

**--weight-decay** (FLOAT) weight decay 

**--warmup-ratio**  (FLOAT) ratio of total training steps used for warmup

**--lora-rank**  (INT) rank for LoRA

**--lora-alpha** (INT) alpha value for LoRA

**--lora-dropout** (FLOAT)  dropout rate for LoRA

**--lora-full-model / --no-lora-full-model** train on full LoRA, if not, then only action head is used

**--dataloader-num-workers** (INT) number of workers for data loading per GPU. 

**--gradient-accumulation-steps** (INT) gradient accumulation steps for training

**--dataloader-prefetch-factor** (INT)  prefetch factor for data loading

**--report-to training** metrics report

**--embodiment-tag** embodiement for training

**--video-backend** type of video backend for training

**--balance-dataset-weights / --no-balance-dataset-weights** balance the dataset weights

**--balance-trajectory-weights / --no-balance-trajectory-weights** sample trajectories within a dataset weighted by their length