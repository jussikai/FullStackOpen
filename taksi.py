import gym
import random 
import numpy
import time

env = gym.make("Taxi-v2") 
next_state = -1000*numpy.ones((501,6)) 
next_reward = -1000*numpy.ones((501,6))

# Training 
# # THIS YOU NEED TO IMPLEMENT

# Testing 
test_tot_reward = 0
test_tot_actions = 0 
past_observation = -1 
observation = env.reset(); 
for t in range(50):
    test_tot_actions = test_tot_actions+1 
    action = numpy.argmax(next_reward[observation]) 
    if (observation == past_observation): 
        # This is done only if gets stuck 
        action = random.sample(range(0,6),1) 
        action = action[0] 
    past_observation = observation 
    observation, reward, done, info = env.step(action) 
    test_tot_reward = test_tot_reward+reward 
    env.render() 
    time.sleep(1)
    if done: 
        break 
print("Total reward: ") 
print(test_tot_reward) 
print("Total actions: ") 
print(test_tot_actions)
