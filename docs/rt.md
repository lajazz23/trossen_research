# RT-1 (Google)

RT-1 is a **real-time transformer-based robot policy** that can control real-world robots.  

---

## Overview

- Designed for **everyday manipulation tasks**: opening doors, moving objects, etc.  
- Takes **language instructions** and a **short video** from the robot camera to guide actions  
- Learns **directly from human demonstrations**, mimicking actions  
- Capable of **generalization, scaled training, and real-world execution**  
- Can generalize **new tasks without retraining** due to language-conditioning and diverse training  
- Direct **robot control policy** (not a vision-language-action model)  
  - Processes a series of images and instructions, not just a single image  

---

## Core

- **Transformer core adapted for robotics**  
  - **EfficientNet-B3** for image processing  
  - **FiLM layers** integrate language instructions with visual features  
  - **TokenLearner** filters for the most relevant information  
- Transformer outputs decisions about the robot’s actions  

---

## Method

- Inputs processed by the core to **extract and compact visual tokens**  
- **Decoder-only transformer** processes tokens and outputs discrete tokens for each limb  
  - (π0.5 outputs text tokens, which are then passed to a control policy)  
- Trained on **130k real robot demonstrations**, not just internet data  
- Runs at **3 Hz**, providing fast action response for robot execution  



----
Made by Jasmin Lin.