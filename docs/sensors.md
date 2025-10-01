# Sensors, Actuators, and Control in Robotics

## Sensors
Sensors are used to assist in environmental perception and navigation:

### Cameras (visual)
- **Monocular cameras**: for 2D image capture  
- **Stereo cameras**: for 3D image capture, with good depth perception  
- **RGB-D cameras**: use RGB and depth perception for advanced navigation and environmental interaction  
- **Thermal cameras**: detect infrared radiation, good for dark or foggy environments  
- **Event-based cameras**: specialized in high-speed motion detection  

### LIDAR (distance)
- **2D Lidar**: ideal for basic planar navigation  
- **3D Lidar**: ideal for wide-field navigation  
- **Solid-state, Flash, MEMS Lidar**: adds lasers to measure distance, great for mapping  

### Other Sensors
- **IMU**: orientation, acceleration  
- **GPS**: navigation, outdoor localization  
- **Radar**: distance, speed, size  
- **Ultrasonic**: distance  
- **Wheel encoders**: wheel rotation  
- **Touch sensors**: detect contact  

---

## Actuators
Actuators are used for movement and manipulation based on sensor feedback:

- **Motors**: general movement  
- **Servos**: precision movement  
- **Pneumatic/hydraulic actuators**: force application  

---

## Controllers
Controllers take in all the input data and output movement:

- Microcontrollers, single-board controllers, embedded systems  
- Assess the environment using sensors and then use actuators to move  
- **Proportional-Integral-Derivative (PID) control**: continuously adjusts movements to make real-time corrections  
- **Model Predictive Control (MPC)**: precisely tracks trajectories by optimizing the robot’s path via predictions  

---

## Perception
These robots have perception—they can combine sensing with visual input to visualize their environment in 3D:

- Builds 3D map of the environment  
- Tracks its own movement through the environment  
- Constant localization as it moves  


----
Made by Jasmin Lin.