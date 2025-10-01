# Trossen MobileAI & Robot Operating System (ROS)

## Training & Simulation

- Data is collected via **teleoperation** and **imitation learning**.  
- **LeRobot** is used to collect episodes from physical runs or simulation.  

### LeRobot Details
[Tutorial Video](https://www.youtube.com/watch?v=yi9wdm9e53Y)

- Each arm has its own **IP address** to connect to the computer.  
- Arms have **predefined ranges of motion**.  
- Default camera is **Intel RealSense**, but **OpenCV cameras** can also be used.  
  - Match the camera to the correct index and update the configuration.  
  - Note: RealSense cameras may encounter **USB bandwidth issues**.  
- You may **record and upload datasets** to platforms like HuggingFace.  
- Episodes can be watched **remotely** or **locally** (follower arm mimics your movement).  

### Training & Evaluation
- The robot tries to **mimic the training data** you recorded.  
- **Checkpoints** are automatically saved.  

### Simulation Details (without hardware)
- **MuJoCo window** displays the simulation.  
- **End-effector control**: moves the robot based on scripted end-effector movements.  
- **Joint-level control**: moves the robot based on controllers.  
- **Two-stage pipeline**:  
    1. Runs a scripted policy in the environment  
    2. Joint trajectories are replayed  
- You can define the **environment**, **data logs**, and **rewards** yourself.  
- **Motion logic** includes trajectories that define:  
    - Time  
    - 3D position  
    - Orientation  
    - Gripper value  

- **Interbotix drivers** interface between high-level commands and low-level actions.  
- **State observations** are made using **Intel RealSense RGB-D cameras** (image and depth).  
  - Configuration includes serial numbers and IP addresses.  
- **Actions** are output by a high-level policy:  
  - In MuJoCo:  
    - **End-effector control**: control the gripper pose  
    - **Joint-level control**: control each joint individually  
  - The driver (Interbotix) translates commands into motor actions, compensates for gravity, ensures safety, and manages low-level protocols.  

---

## Robot Operating System (ROS)

**Repository:** [Interbotix ROS Core](https://github.com/Interbotix/interbotix_ros_core)  

### Interbotix Research Robotics Open Standard (IRROS) Layers
 **1. Hardware Layer**  
    - Defines actuators and sensors in the robot  
    - Includes actuator interface, controllers, drivers, and motors  

**2. Driver Layer**  
    - Contains ROS wrappers to obtain data from sensors and actuators  
    - Repository resides in this layer  

**3. Control Layer**  
    - ROS packages for all Interbotix robot configurations  
    - Define parameters for actuators & sensors and manage launch files  

**4. Application Support Layer**  
    - Makes working with the robot easier  

**5. Research Layer**  
    - User-supplied custom code  

---

### ROS Functionality

- Links hardware with software using **nodes**.  
    - Each node can serve a purpose: data collection, reasoning, output.  
- ROS drivers and wrappers allow working with **high-level details** while covering actuator specifics.  

### ROS Versions

#### ROS 1 (Noetic)
- Uses a **master node** to manage all other nodes  
- Good for research; can run on multiple robots with custom networking or ROS namespaces  
- Many supporting resources, but considered **legacy**  

#### ROS 2 (Galactic, Humble, Rolling)
- Uses **DDS (Data Distribution Service)**; no central master node  
- Suitable for **real-time robotics** and multi-robot communication  
- More modern and actively updated  




----
Made by Jasmin Lin.