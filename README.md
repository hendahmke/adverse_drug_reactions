# Detecting side effects in prescription drug reviews

## Description
- In this project, a team of data scientist created a web application to search for underreported side-effects for prescription drugs. You can find out app here:

    https://sideeffects.herokuapp.com
 
 - NOTE: DO NOT USE THIS AS A DIAGNOSIS TOOL. ONLY CONSULT YOUR PHYSICIAN!
 

## Preprocessing

We analysed over 200,000 drug reviews. As this was unlabeled data, we used several NLP preprocessing algorithms to both generate lists of "spoken language" symptoms, i.e. how people actually describe side effects in spontaneous reports, as well as to how detect side effects based on word similiarties. We did this using

- BERT to generate a list of side effects from the Google Gigaword corpus (GLOVE) 
- Word2Vec to detect word clusters within our own set of reviews

## Unsupervised learning

LDA models were used to generate topics and then the reviews were vectorized based on our list side effects (along with various controls) 

## Packaging and deployment

The front end was developed using Flask in order to continious integrate our python based backend. 

https://sideeffects.herokuapp.com

The app is CI enabled for future development. 







