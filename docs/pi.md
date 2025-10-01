# π0.5

π0.5 is a **multimodal vision-language-action (VLA) model** used to reason and understand scenes and instructions.  

---

## Overview

- Uses **co-training on heterogeneous tasks** to enable broad generalization  
- Trains on **data from multiple robots**, high-level semantic predictions, web data, and other sources  
- Capable of **dexterous tasks**, such as cleaning homes  
- Robots only become useful **outside the lab** in real-world scenarios  
- Can deduce actions for tasks on their own and **transfer knowledge from other systems**  
- Streamlines multiple types of data into a single readable datasheet  
- Can perform tasks it has **not been explicitly trained on**, by dividing them into subtasks automatically  
- Uses a **hierarchical architecture** with 2 levels:  
  - Base model trained on many tasks  
  - Fine-tuned for real robot tasks  
- Predicts the **next semantic subtask** by generating short action tasks  

---

## Previous Work / Significance

- Earlier robots were **narrowly trained and limited**  
- Modern models can perform more tasks in more environments across different robot types  
- VLAs take **visual + language input** and output clean actions  
  - Co-trained on videos with subtitles, robot simulations, text descriptions, and manual demos  
- π0.5 combines:  
  - Web-scale vision-language data  
  - Simulation & robot demos  
  - Semantic labels & verbal instructions  
  - Knowledge transferred from other robots  
- Goal: **generalization across unseen objects, instructions, environments, and untrained tasks**  

---

## Training and Model Structure

- **Base model:** vision-language model that understands scenes and semantics  
  - Built on strong visual-language priors  
- **Pre-training:** enables robot to understand relevant tasks  
  - Inputs/outputs are converted into **discrete tokens**  
- **Post-training:** specializes the model for **mobile manipulation**  
  - Includes an **action expert** predicting low-level control actions  
  - Outputs detailed motor commands for subtasks  
- Model **input:** images or robot state  
- Model **output:** string tokens and motor commands  
- **Data blending:** converts all inputs into tokens for efficiency  
- Uses **discrete tokens** + **flow-matching** simultaneously  
  - Flow-matching produces smooth actions  
  - Discrete tokens compress data for prediction  
- **Training:** autoregressive transformer predicts next token in sequence  
- **Testing:** skips token decoding, uses flow-matching for action execution  

---

## Multimodal Grounding

- Model learns tasks **may differ across robots/environments**  
- Follows a **hierarchical plan**  
- Multimodal grounding:  
  - **Language ↔ Vision:** identifies subjects in tasks (e.g., cup location, floor texture, color)  
  - **Vision ↔ Action:** maps object location to controlled actions  
  - **Language ↔ Action:** interprets text instructions into trajectories  
  - **Vision + Language ↔ Action:** generates action tokens/flow vectors from image + text  
- Uses **images** to perceive surroundings, **language** to determine intent, and decides **actions**  
- Learns **relationships between text, images, and motion**  

---

## Action Expert

- Predicts **continuous actions** using flow-matching  
- Outputs **real-valued control vectors**, e.g., joint angles, base velocities  

---

## Hardware Control System

- Experiment run on **two mobile manipulator platforms**  
- π0.5 outputs **target poses** for:  
  - Each arm joint  
  - Gripper position  
  - Torso lift  
  - Base  
- Predicts **multi-step action chunks** instead of step-by-step actions  
- Can produce plans for **different robot configurations**  
- Fuses **multi-view visual data** across tasks  

---

## Experimental Evaluation

- Robots successfully accomplished tasks in **mock and real environments**  
- **More diverse training environments** → better generalization  
- **Full pre-training** is necessary for optimal results  
  - Mixed data: web, robot, subtask annotations  
- High training exposure improves **language following / prompt understanding**  
- **High-level interference:** robot determines the next task  
- **Domain-specific robot data** critical for planning:  
  - Object names and relationships  
  - Human instructions  
  - Subtask breakdown  

---

## Limitations

- Unfamiliar items in environments remain challenging  
- Partial observability affects robot function (e.g., arm blocking view)  
- High-level subtask interference can cause repeated actions or distractions  
- Can only process **simple prompts** (e.g., "clean this up")  



----
Made by Jasmin Lin.