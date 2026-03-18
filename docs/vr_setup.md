# Incorporation of Virtual Reality for Teleoperation
## Setup

Virtual Reality (VR) allows us to directly interact and manipulate our robot in simulation. On Linux platforms, we will need to use ALVR + SteamVR to connect our Meta Quest Pro to Isaac Lab Mimic (Linux only).

## Hardware
- Meta Quest Pro (supports hand-tracking)
- Ubuntu 24.04
- NVIDIA GeForce RTX 4090

## Software

### ALVR + SteamVR
Download the ALVR Launcher from their [GitHub](https://github.com/alvr-org/ALVR?tab=readme-ov-file) and follow their installation instructions. If using a Meta Quest Pro, ensure "Developer mode" is on within the headset settings.

Also obtain SteamVR. Within the Steam application, navigate to the SteamVR settings > Properties > General > Launch Options.

Here, you will input the path to your `vrmonitor.sh` file, typically found at: `/home/{user}/.local/share/Steam/steamapps/common/SteamVR/bin`, followed by `%command%` like so:

```
/home/{user}/.local/share/Steam/steamapps/common/SteamVR/bin/vrmonitor.sh %command%
```

Next, open the ALVR launcher with the Meta Quest Pro connected. After installing the APK, the app should appear within the headset. In the headset, allow the computer access to the files over USB. From the desktop ALVR Launcher, find the headset. If it does not appear, you can manually input the IP and connection, found within the headset through its ALVR instance. You can now launch SteamVR from the desktop launcher. 

### Isaac Lab Mimic

You can find the documentation to Isaac Lab Mimic [here](https://isaac-sim.github.io/IsaacLab/main/source/overview/imitation-learning/teleop_imitation.html).

You can launch their demos to confirm VR <-> Isaac Lab pipeline is working.


----
Made by Jasmin Lin.