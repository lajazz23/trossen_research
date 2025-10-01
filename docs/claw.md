# CLAW (CLIP-Language-Action for Weight)

**CLAW** is a **weight-aware Vision-Language-Action (VLA) model** that decouples condition evaluation from action generation.  

---

## Key Features

- Uses a **condition-monitoring module** to evaluate numeric task constraints (e.g., weight thresholds) for action output.  
- Combines **CLIP** and **π0** for continuous visuomotor control:  
  - **CLIP** converts numeric readings into symbolic language prompts, ideal for detecting when a weight threshold is reached.  
        - Determines if the robot should grip harder or stop.  
  - **π0** produces continuous, high-frequency robot actions from **multi-view observations**.  
        - Maps observations + language input into continuous motor commands.  
  - Together:  
        - CLIP labels the task ("grip" or "no grip")  
        - Passes this prompt to π0  
        - π0 is fine-tuned using **flow-matching loss** conditioned on the prompts  

---

## Motivation

- Standard VLAs often struggle with **precise execution**, particularly for manipulation tasks like **picking up objects**.  
- CLAW addresses this by integrating **weight awareness** into the decision-making process.  

---

## CLAW Pipeline

1. **Language Input**  
2. **CLIP** monitors the scale → outputs “stop” or “continue” based on weight threshold  
3. **π0** generates continuous robot actions using the CLIP prompt + multi-view images  
4. Loop continues until the **target weight is reached**  



----
Made by Jasmin Lin.