# GR00T N1 (NVIDIA)

GR00T N1 is a **Vision-Language-Action (VLA) model** that generates actions from images and language instruction inputs and uses a **dual-system compositional architecture**.  

---

## Dual-System Compositional Architecture

- Based on human cognition, the model has **two systems**:  
  1. **System 1** – fast, instinctive, automatic  
  2. **System 2** – slow, thoughtful, logical  

### System 2 (Vision-Language-Action)
- Understands words and images together  
- Uses the robot’s camera feed and given instructions to determine actions  
- Operates at **10 Hz**, slower but allows for more reasoning  

### System 1 (Diffusion Transformer)
- Uses System 2’s output and its sensors to decide movement  
- Operates at **120 Hz**  
- Uses **diffusion** to ensure smooth motion  
- Cooperates with System 2 (System 1 listens to System 2)  

---

## Data Pyramid Structure

- To prevent data overload, the model organizes data hierarchically:  
  - **Base:** large quantities of web data and human videos  
  - **Middle:** synthetic data  
  - **Top:** real-world data collected by physical robots  

---

## Co-Training Strategy

- Trains using **action-less data sources** with a **latent-action codebook** and a **trained inverse dynamics model (IDM)**:  
  - Latent-action compresses movement patterns into reusable codes for guessing actions without labels  
  - IDM predicts missing frames in videos, outputting estimated actions  
- Robot is trained on a **mix of real robot data, synthetic video, and human videos**  
- Eliminates the need for large pools of labeled data  

---

## GR00T N1 Foundation Model

- A **VLA model** that can interact with its environment  
- Uses **NVIDIA Eagle-2 VLM** as backbone:  
  - Understands the image  
  - Interprets the goal  
  - Encodes information into tokens for downstream analysis  
- Uses the **Diffusion Transformer**:  
  - Takes encoded visuals and VLM info  
  - Quickly generates movements  
  - Performs **flow-matching** for smooth motion  

---

## Model Architecture

- **State and Action Encoders** normalize representations across robots  
  - Small neural net converts actions and raw states into a shared space  
  - Action encoder incorporates timesteps  
- **Flow matching**: uses ground-truth actions and Gaussian noise to train the model to predict denoising vector fields  
- **Eagle-2 VLM** integrates SmolLM2 and SigLIP-2 to interpret images + text instructions  
  - Images resized and passed through pixel shuffle  
  - Combined with text in a chat-style format  
- **Diffusion Transformer** predicts actions from inputs  
  - Alternates between processing actions and injecting vision-language features  
  - Action decoder outputs clean predicted actions  
- Designed for **multi-robot compatibility**, accommodating different action spaces  

---

## Generation of Training Data

- Organized according to the **data pyramid**  
- **High-quality data** comes from real humans controlling robots (teleoperation)  
- **VQ-VAE** generates latent actions from videos lacking robot action labels  
- Improves efficiency and lowers cost of real robot data  

---

## Neural Trajectories

- Video generation models synthesize robot behavior based on existing data (~10× more data)  
- Multimodal LLM improves quality/diversity by detecting objects and generating task variations  
- LLM assesses whether generated actions match the intended prompt  

---

## Simulation Trajectories

- **DexMimicGen** generates large-scale simulated robot data:  
  - Breaks data into action chunks  
  - Modifies small details (object location) while preserving action  
  - Smooth transitions between frames  
  - Saves data only if the robot succeeds in simulation  

---

## Training Details

- **Pre-training:** flow-matching on real and synthetic robot + human data  
  - Extracts latent actions from human videos without ground-truth actions  
- **Post-training:** fine-tunes the pretrained model on embodiment-specific datasets  
- **Neural trajectories** generate robotic behaviors for missing real-world teleoperation data  
  - Generates visuals only  
  - Uses latent action codes  
  - IDM estimates actions from video changes  
- **DexMimicGen** generates high-quality training datasets  
- **Source demonstrations** collected via Leap Motion Devices, which DexMimicGen uses to synthesize new demos  
- **Evaluation:** tabletop tasks like pick-and-place, object passing, manipulation, coordination  



----
Made by Jasmin Lin.