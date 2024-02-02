### 1. Create MindsDB YouTube Database

```sql
CREATE DATABASE mindsdb_youtube
WITH ENGINE = 'youtube',
PARAMETERS = {
  "youtube_api_token": '--insert your YouTube API token here--'  
};
```

This code snippet creates a MindsDB database named mindsdb_youtube with the 'youtube' engine, and it includes parameters such as the YouTube API token for authentication.

### 2. Fetch Handlers

```sql
-- To fetch the list of handlers
SELECT * FROM information_schema.handlers;
```
This query attempts to retrieve information about handlers from the information schema. Handlers are components responsible for various functionalities in the database.

### 3. Fetch YouTube Comments

```sql
-- To fetch the comments of the respective YouTube channel
SELECT * FROM mindsdb_youtube.comments
WHERE video_id = "bqjmvJFHGbw";
```

This query fetches comments from the comments table in the MindsDB YouTube database for a specific video with the given video_id.

### 4. Create OpenAI Engine

```sql
SHOW handlers WHERE name='openai';

CREATE ML_ENGINE openai_engine
FROM openai
USING 
   api_key = '--insert your OpenAI API key here--';
```

This code snippet checks for the existence of an 'openai' handler and creates a machine learning engine named openai_engine using the OpenAI engine with the specified API key.

### 5. Create MindsDB Models

```sql
-- Create the model for YouTube comments sentiment analysis
CREATE MODEL mindsdb.comment_analyzer
PREDICT sentiment
USING
  engine = 'openai_engine',
  model_name = 'gpt-4',
  max_tokens=400,
  prompt_template = 'Evaluate the sentiment of the following comment segments enclosed by {} and separated by &. Provide only one sentiment for each comment, strictly choosing one out of these sentiments: Appreciation, Hate, Neutral, Spam. Avoid offering any explanations. If {comment1}& {comment2}& is passed, the response should be sentiment1, sentiment2. If {comment1}& {comment2}& {comment3}& {comment4}& {comment5}$ is passed, the response should be sentiment1, sentiment2, sentiment3, sentiment4, sentiment5. Ensure that this format remains consistent for all comments, and the maximum number of comments to be passed is up to 5 - {{comment}}';

-- Create the model for YouTube video text summary
CREATE MODEL mindsdb.text_summary
PREDICT summary
USING
  engine = 'openai_engine',
  model_name = 'gpt-4',
  max_tokens=400,
  prompt_template = 'Summarize the content of the YouTube video using transcript in short and strictly donot give incomplete summary - transcript: {{transcript}}';

-- Create the model for blog text summary
CREATE MODEL mindsdb.blog_summary
PREDICT summary
USING
  engine = 'openai_engine',
  model_name = 'gpt-4',
  max_tokens=400,
  prompt_template = 'Summarize the content of the blog using markdown in short and strictly donot give incomplete summary - markdown: {{markdown}}';
```

These snippets create MindsDB models for sentiment analysis of YouTube comments, text summary for YouTube videos, and text summary for blog posts. The models use the OpenAI engine with GPT-4.

### 6. Delete Model and Check Model Status

```sql
-- Delete the model
DROP MODEL blog_summary;

-- See the status of the model
DESCRIBE comment_analyzer;
```

This code deletes the blog_summary model and checks the status of the comment_analyzer model.

### 7. Create Models for Image and Content Generation

```sql
-- Model for image generation
CREATE MODEL mindsdb.image_generator
PREDICT img_url
USING
   engine = 'openai_engine',
   mode = 'image',
   max_tokens=400,
   prompt_template ='Generate a highly detailed and realistic high quality HD image in 16:9 aspect ratio that corresponds to the {{user_input}}';

-- Model for content generation
CREATE MODEL mindsdb.content_generator
PREDICT content
USING
    engine='openai_engine',
    max_tokens=600,
    prompt_template='Generate and suggest content ideas and topic in 250 words based on given genre and the user detail in the form of an array of objects only(donot include any other information), with each object representing a specific content type (video, reels, blog, social media post). Include keys for content_type, title, and description. Make sure you close all the brackets properly. Genre:{{genre}}, Detail:{{detail}}';

-- Drop model for image generation
DROP MODEL image_generator;

-- Drop model for content generation
DROP MODEL content_generator;
```

These snippets create models for image generation and content generation using the OpenAI engine. The subsequent ```DROP MODEL``` statements remove the models


### 3. AI agents wit mindsdb : 

CREATE KNOWLEDGE BASE command is used to create a knowledge base from an embedding model, and the CREATE SKILL command is used to define specific skills that utilize knowledge bases or other resources for tasks like sentiment analysis or text summarization. The agent is then configured with these skills to enable it to respond intelligently to user input.

```sql
-- Create an ML Engine for OpenAI
    CREATE ML_ENGINE openai_engine
    FROM openai
    USING
        api_key = 'sk-.................';

-- Create an embedding model for the knowledge base
    CREATE MODEL mindsdb.embedding_model
    PREDICT embeddings
    USING
       engine = 'openai_engine',
       mode='embedding',
       model_name='text-embedding-ada-002',
       question_column = 'content';

-- Create a knowledge base using the embedding model
    CREATE KNOWLEDGE BASE my_knowledge_base
    USING
       model = mindsdb.embedding_model;

-- Insert data into the knowledge base
    INSERT INTO my_knowledge_base (content)
    VALUES ("I really enjoyed reading about your experiences and lessons learned as a developer. It's clear that you have a passion for this field and a dedication to constantly improving your skills. Keep on coding!");

--  Create a skill for sentiment analysis using the knowledge base
    CREATE SKILL sentiment_analysis_skill
    USING
        type = 'knowledge_base',
        source = 'my_knowledge_base',
        description = 'Sentiment Analysis';
```
