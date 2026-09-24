window.EXAM_DATA_3 = {
  "meta": {
    "id": 3,
    "title": "Practice Exam 3",
    "badge": "badge-services",
    "badgeText": "AI services in practice",
    "description": "65 questions across all five domains, with visual explanations and targeted revision.",
    "questionsCount": 65,
    "timeLimitMinutes": 90,
    "domains": [
      {
        "id": 1,
        "title": "Fundamentals of AI and ML",
        "weight": 20,
        "count": 13
      },
      {
        "id": 2,
        "title": "Fundamentals of Generative AI",
        "weight": 24,
        "count": 16
      },
      {
        "id": 3,
        "title": "Applications of Foundation Models",
        "weight": 28,
        "count": 18
      },
      {
        "id": 4,
        "title": "Guidelines for Responsible AI",
        "weight": 14,
        "count": 9
      },
      {
        "id": 5,
        "title": "Security, Compliance, and Governance for AI Solutions",
        "weight": 14,
        "count": 9
      }
    ]
  },
  "questions": [
    {
      "id": "e3_q1",
      "examId": 3,
      "questionNumber": 1,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Supervised Learning - Classification",
      "type": "single",
      "scenario": "An online retailer wants to predict whether a customer will return a purchased clothing item within 30 days based on size, fabric, customer history, and price.",
      "question": "What type of machine learning task is this?",
      "options": [
        "Binary classification",
        "Continuous regression",
        "Unsupervised clustering",
        "Reinforcement learning"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Predicting whether an item will be returned or kept is a binary classification problem (Return: Yes or No).",
      "distractors": [
        "Two mutually exclusive discrete outcomes = binary classification.",
        "Regression predicts continuous numbers (e.g. dollar cost).",
        "Clustering groups unlabeled samples.",
        "Reinforcement learning optimizes policy actions through rewards."
      ],
      "examTrap": "Binary outcome (Yes/No, Churn/No Churn, Return/Keep) = Binary Classification.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "learning",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q2",
      "examId": 3,
      "questionNumber": 2,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Evaluation Metrics - F1-Score",
      "type": "single",
      "scenario": "A fraud detection model has high precision but low recall. The product manager wants a single combined metric that balances both precision and recall equally.",
      "question": "Which metric is the harmonic mean of precision and recall?",
      "options": [
        "F1-score",
        "Accuracy",
        "Mean Squared Error (MSE)",
        "Specificity"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "The F1-score is the harmonic mean of precision and recall (2 * (Precision * Recall) / (Precision + Recall)), providing a balanced measure when classes are imbalanced.",
      "distractors": [
        "F1-score is the harmonic mean of precision and recall.",
        "Accuracy treats all classes equally and is distorted by class imbalance.",
        "MSE is for regression.",
        "Specificity measures true negative rate."
      ],
      "examTrap": "Harmonic mean of precision and recall = F1-score.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "metrics",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-metrics.html"
    },
    {
      "id": "e3_q3",
      "examId": 3,
      "questionNumber": 3,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "AUC-ROC Curve Interpretation",
      "type": "single",
      "scenario": "A data scientist evaluates a binary classification model and determines that the Area Under the Receiver Operating Characteristic Curve (AUC-ROC) is 0.50.",
      "question": "What does an AUC-ROC score of 0.50 indicate about the model's predictive ability?",
      "options": [
        "The model has perfect predictive capability.",
        "The model performance is equivalent to random guessing.",
        "The model is 50% faster than standard models.",
        "The model is severely underfitting by exactly 50%."
      ],
      "correctAnswers": [
        1
      ],
      "explanation": "An AUC-ROC score of 1.0 represents a perfect classifier that cleanly separates all positive and negative classes. An AUC-ROC of 0.50 means the model has no discrimination capacity and performs no better than random coin flips.",
      "distractors": [
        "Perfect prediction is 1.0.",
        "AUC-ROC of 0.50 equals random chance.",
        "AUC measures predictive discrimination, not compute speed.",
        "AUC does not quantify percentage of underfitting."
      ],
      "examTrap": "AUC-ROC: 1.0 = Perfect; 0.50 = Random Guessing.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "metrics",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-model-quality-metrics.html"
    },
    {
      "id": "e3_q4",
      "examId": 3,
      "questionNumber": 4,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Deep Learning - Convolutional Neural Networks (CNNs)",
      "type": "single",
      "scenario": "An automated vehicle software team needs an algorithm to detect pedestrians, street signs, and lane boundaries from high-definition video camera frames.",
      "question": "Which deep learning neural network architecture is specifically designed for processing spatial grid data like images?",
      "options": [
        "Convolutional Neural Networks (CNNs)",
        "Recurrent Neural Networks (RNNs)",
        "Linear Regression",
        "K-Means"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Convolutional Neural Networks (CNNs) use convolutional kernels and pooling layers to extract hierarchical spatial features (edges, textures, shapes, objects) from image and video data.",
      "distractors": [
        "CNNs are the standard architecture for spatial computer vision tasks.",
        "RNNs are designed for sequential time-series/text data.",
        "Linear regression cannot extract spatial image features.",
        "K-Means is a clustering algorithm."
      ],
      "examTrap": "Computer vision / image feature extraction = Convolutional Neural Networks (CNNs).",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "neural",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
    },
    {
      "id": "e3_q5",
      "examId": 3,
      "questionNumber": 5,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "ML Lifecycle - Business Goal vs ML Framing",
      "type": "single",
      "scenario": "A streaming company notices high subscriber cancellation rates. The executive team defines a KPI: 'Decrease monthly subscriber churn from 6% to 4% within six months.'",
      "question": "In the AWS machine learning lifecycle, what is the immediate next step after defining this business goal?",
      "options": [
        "ML Problem Framing",
        "Hyperparameter tuning in SageMaker",
        "Purchasing dedicated EC2 GPU instances",
        "Deploying a model to production"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "After business goal identification, the next step in the ML lifecycle is ML Problem Framing: evaluating whether ML is appropriate, defining the target variable (e.g. classification of churn risk), assessing data availability, and defining success criteria.",
      "distractors": [
        "ML Problem Framing translates the business objective into an actionable ML formulation.",
        "Hyperparameter tuning happens during model training.",
        "Hardware provisioning occurs after framing and data preparation.",
        "Deployment is the final stage."
      ],
      "examTrap": "ML Lifecycle sequence: Business Goal -> ML Problem Framing -> Data Processing -> Model Development -> Deployment -> Monitoring.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "lifecycle",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q6",
      "examId": 3,
      "questionNumber": 6,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Data Preprocessing - Handling Missing Values",
      "type": "single",
      "scenario": "A data engineer prepares a tabular dataset for SageMaker training. A numerical column 'Annual Income' is missing values for 4% of the records. Deleting the records would discard valuable training samples.",
      "question": "Which data preprocessing technique fills in missing numerical values using statistical estimates like the median or mean?",
      "options": [
        "Imputation",
        "One-hot encoding",
        "Min-max scaling",
        "Model pruning"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Data imputation replaces missing data values with substituted statistical values (such as the column mean, median, or k-nearest neighbor estimates) to retain row samples without introducing null errors.",
      "distractors": [
        "Imputation fills missing values using mean, median, or statistical estimates.",
        "One-hot encoding converts categorical text to binary vectors.",
        "Scaling normalizes numerical ranges.",
        "Pruning removes parameters from neural networks."
      ],
      "examTrap": "'Fill in missing numerical values' = Imputation.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "data",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q7",
      "examId": 3,
      "questionNumber": 7,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Feature Engineering - One-Hot Encoding",
      "type": "single",
      "scenario": "A tabular dataset contains a categorical column 'PaymentMethod' with three text values: 'CreditCard', 'PayPal', and 'BankTransfer'. An ML algorithm requires purely numerical inputs.",
      "question": "Which feature engineering method converts this column into three distinct binary (0 or 1) columns?",
      "options": [
        "One-Hot Encoding",
        "Principal Component Analysis",
        "Kernel SHAP",
        "Textract Queries"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "One-Hot Encoding converts categorical variables into binary format by creating a new column for each unique category, setting the value to 1 if the row matches that category and 0 otherwise.",
      "distractors": [
        "One-Hot Encoding transforms categorical strings into binary indicator columns.",
        "PCA reduces continuous feature dimensions.",
        "Kernel SHAP provides explainability.",
        "Textract Queries extracts text from scanned PDF forms."
      ],
      "examTrap": "'Convert categorical text into binary 0/1 columns' = One-Hot Encoding.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "features",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html"
    },
    {
      "id": "e3_q8",
      "examId": 3,
      "questionNumber": 8,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Overfitting Prevention - Dropout",
      "type": "single",
      "scenario": "During training of a multi-layer deep neural network, the model memorizes the training data patterns. To prevent co-adaptation of neurons, the engineer randomly deactivates 20% of the neurons during each training pass.",
      "question": "Which regularization technique is being used?",
      "options": [
        "Dropout",
        "Data drift",
        "Quantization",
        "Gradient clipping"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Dropout is a neural network regularization technique where randomly selected neurons are ignored ('dropped out') during forward and backward passes, forcing the network to learn redundant, robust features and preventing overfitting.",
      "distractors": [
        "Dropout randomly deactivates a fraction of neurons during training to prevent overfitting.",
        "Data drift is production feature distribution shift.",
        "Quantization lowers weight precision.",
        "Gradient clipping prevents exploding gradients."
      ],
      "examTrap": "Randomly deactivating neurons during neural network training = Dropout.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "fit",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q9",
      "examId": 3,
      "questionNumber": 9,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Monitoring - Feature Drift",
      "type": "single",
      "scenario": "A credit scoring model was trained on historical data where borrower income ranged from $30,000 to $60,000. Three years later, wage inflation shifts the borrower population income distribution to $55,000 to $95,000, though the mathematical formula for debt-to-income risk remains unchanged.",
      "question": "What specific type of drift has occurred?",
      "options": [
        "Feature drift (Data drift)",
        "Concept drift",
        "Hyperparameter drift",
        "Model drift"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Feature drift (also called data drift or covariate shift) occurs when the statistical distribution of the input features changes over time, while the conditional relationship between features and the target label remains constant.",
      "distractors": [
        "The distribution of the input feature (income) changed, which is feature/data drift.",
        "Concept drift occurs when the relationship between features and target changes.",
        "Hyperparameters are static training settings.",
        "Model drift is the degradation in output accuracy resulting from data or concept drift."
      ],
      "examTrap": "Distribution of input features changes = Feature Drift / Data Drift.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "drift",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html"
    },
    {
      "id": "e3_q10",
      "examId": 3,
      "questionNumber": 10,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "ML workflow ordering",
      "type": "ordering",
      "scenario": "A team is choosing an AI approach for customer support.",
      "question": "Place these steps in the best order.",
      "options": [
        "Measure quality, cost and risks in a pilot",
        "Define the support outcome to improve",
        "Approve an approach and monitor production",
        "Select representative evaluation cases"
      ],
      "correctAnswers": [
        1,
        3,
        0,
        2
      ],
      "explanation": "Start with the intended goal and appropriate data. Learn from training data, make choices using validation evidence, and evaluate honestly before production monitoring. Workflows may iterate, but later evaluation must not leak into training.",
      "distractors": [
        "This is a step in the workflow; its position depends on the prerequisites.",
        "This is a step in the workflow; its position depends on the prerequisites.",
        "This is a step in the workflow; its position depends on the prerequisites.",
        "This is a step in the workflow; its position depends on the prerequisites."
      ],
      "examTrap": "Separate learning, selection and final evaluation.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "lifecycle",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q11",
      "examId": 3,
      "questionNumber": 11,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Evaluation Metrics - Mean Absolute Error (MAE) vs MSE",
      "type": "single",
      "scenario": "A housing price regression model is being evaluated. The team wants an error metric expressed in the exact same physical units as the target ($ USD) that does NOT disproportionately penalize rare large outlier errors by squaring them.",
      "question": "Which regression metric should the team select?",
      "options": [
        "Mean Absolute Error (MAE)",
        "Mean Squared Error (MSE)",
        "R-squared",
        "Accuracy"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Mean Absolute Error (MAE) measures the average absolute difference between predicted and actual values. Because it does not square errors, it is linear, intuitive in physical units ($), and more robust to extreme outliers than MSE.",
      "distractors": [
        "MAE measures average absolute error without squaring, keeping the original units.",
        "MSE squares errors, heavily penalizing large outliers and changing the unit to dollars squared.",
        "R-squared measures percentage of variance explained.",
        "Accuracy evaluates discrete classification."
      ],
      "examTrap": "Regression error in same units ($) without disproportionately penalizing outliers = Mean Absolute Error (MAE).",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "regression",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q12",
      "examId": 3,
      "questionNumber": 12,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Data Splitting Best Practices",
      "type": "single",
      "scenario": "When preparing data for training and evaluating an ML model in Amazon SageMaker, why is the dataset partitioned into three distinct subsets (Train, Validation, and Test)?",
      "question": "Why keep training, validation and test datasets separate?",
      "options": [
        "Train to learn weights; Validation to tune hyperparameters and prevent overfitting; Test to evaluate unbiased final performance on unseen data.",
        "Train to test accuracy; Validation to store S3 backups; Test to run CloudTrail audits.",
        "Train for linear models; Validation for deep learning; Test for Bedrock.",
        "To satisfy AWS Free Tier bandwidth restrictions."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Training data teaches the model. Validation data helps select settings. An untouched test set estimates how the final model performs on unseen examples. Split ratios depend on the task and available data.",
      "distractors": [
        "Standard 3-way split: Train (learn), Validation (tune), Test (final unbiased evaluation).",
        "Validation is for tuning, not storage backups.",
        "Datasets are split by samples, not algorithm types.",
        "Splitting data is a statistical necessity, not a cloud quota rule."
      ],
      "examTrap": "Train to learn, validate to choose, test to evaluate.",
      "diagramKey": "inference_types",
      "consoleViewKey": "clarify_console",
      "lessonId": "data",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q13",
      "examId": 3,
      "questionNumber": 13,
      "domain": 1,
      "domainTitle": "Domain 1: Fundamentals of AI and ML",
      "subtopic": "Multi-Response (ML Fundamentals)",
      "type": "multiple",
      "scenario": "A machine learning practitioner is reviewing techniques to mitigate overfitting in a high-variance predictive model.",
      "question": "Which TWO techniques effectively reduce overfitting? (Select TWO)",
      "options": [
        "Apply L1 (Lasso) or L2 (Ridge) regularization to penalize large weights.",
        "Collect more training data or use data augmentation to increase dataset size.",
        "Increase the number of layers and neurons in the network to maximize capacity.",
        "Increase the number of irrelevant input features in the dataset.",
        "Set the learning rate to zero."
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": "Overfitting (high variance) occurs when a model memorizes noise in limited training data. Adding regularization (L1/L2 penalties) and increasing training dataset size (or applying data augmentation) are primary methods to force generalization.",
      "distractors": [
        "Regularization penalizes complex weights, simplifying the model.",
        "More diverse training data prevents the model from memorizing specific noisy samples.",
        "Increasing network capacity worsens overfitting.",
        "Irrelevant features add noise, exacerbating overfitting.",
        "A learning rate of zero halts learning completely."
      ],
      "examTrap": "Remedies for overfitting: 1) Regularization (L1/L2, Dropout), 2) More training data.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "learning",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q14",
      "examId": 3,
      "questionNumber": 14,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Generative vs Search Systems",
      "type": "single",
      "scenario": "An enterprise wants to replace their intranet keyword search with a generative AI solution. Instead of returning a list of ten blue document links, employees want direct answers synthesized in conversational sentences.",
      "question": "What capability differentiates Generative AI from traditional keyword search engines?",
      "options": [
        "Generative AI synthesizes novel natural language responses by reasoning across multiple context sources.",
        "Traditional search uses deep neural networks, while GenAI uses SQL queries.",
        "Keyword search is non-deterministic, while GenAI is always deterministic.",
        "Traditional search requires GPU clusters, while GenAI runs on simple CPU."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Traditional search matches keywords and returns links to existing documents. Generative AI reasons over retrieved document chunks and synthesizes novel, coherent natural language answers answering the specific inquiry.",
      "distractors": [
        "GenAI synthesizes cohesive answers across multiple documents.",
        "GenAI relies heavily on deep neural networks.",
        "Keyword search is deterministic; GenAI is probabilistic.",
        "GenAI requires heavy GPU acceleration."
      ],
      "examTrap": "Synthesizing conversational answers from multiple sources = Generative AI vs Keyword Search.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "generation",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
    },
    {
      "id": "e3_q15",
      "examId": 3,
      "questionNumber": 15,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Foundation Model Characteristics",
      "type": "single",
      "scenario": "A technology firm is explaining Foundation Models (FMs) to non-technical stakeholders.",
      "question": "Which statement accurately describes a key characteristic of Foundation Models?",
      "options": [
        "They are trained on massive broad datasets at scale and can be adapted to a wide range of downstream tasks.",
        "They must be re-trained from scratch for every specific individual task.",
        "They are strictly limited to tabular numbers in CSV spreadsheets.",
        "They require rule-based if-then expert logic programmed by human software engineers."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Foundation Models are large neural networks trained on vast, diverse uncurated datasets at scale that possess broad general capabilities and can be adapted to dozens of downstream tasks via prompting or fine-tuning.",
      "distractors": [
        "FMs are trained broadly at scale and adapt to diverse downstream tasks.",
        "FMs do not require training from scratch for each task.",
        "FMs process text, code, images, audio, and video.",
        "FMs learn statistical representations, not hand-coded if-then rules."
      ],
      "examTrap": "'Trained on broad data at scale, adaptable to wide downstream tasks' = Foundation Model definition.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "generation",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
    },
    {
      "id": "e3_q16",
      "examId": 3,
      "questionNumber": 16,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Context Window Sizing",
      "type": "single",
      "scenario": "An organization is processing multi-volume books containing 200,000 words. They attempt to feed the entire volume into a single prompt on a model with a 32k token context window, resulting in an error.",
      "question": "What caused this failure?",
      "options": [
        "Context window token limit exceeded",
        "Serverless inference cold start",
        "AWS KMS key expiration",
        "IAM permission boundary error"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Each foundation model has a fixed maximum context window (e.g. 32k, 128k, 200k tokens). Providing 200,000 words (~266,000 tokens) exceeds a 32k context window, triggering a token limit validation error.",
      "distractors": [
        "Input tokens exceeded the model's supported context window capacity.",
        "Cold starts cause latency, not context token capacity errors.",
        "KMS keys encrypt data, not enforcing prompt token sizes.",
        "IAM errors return AccessDenied, not token length limit."
      ],
      "examTrap": "Exceeding maximum prompt length = Context Window Token Limit Exceeded.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "tokens",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
    },
    {
      "id": "e3_q17",
      "examId": 3,
      "questionNumber": 17,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Prompt Engineering - Chain of Thought with Examples",
      "type": "single",
      "scenario": "A customer support engineering team wants an LLM to follow a specific troubleshooting flow. They include three complete multi-step examples showing how the support agent reasons through each issue before giving the final fix.",
      "question": "Which advanced prompt engineering technique combines few-shot prompting with explicit step-by-step reasoning?",
      "options": [
        "Few-Shot Chain-of-Thought (Few-Shot CoT) prompting",
        "Zero-shot direction",
        "Random Cut Forest",
        "Model Quantization"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Few-Shot Chain-of-Thought combines demonstration exemplars (few-shot) with explicit step-by-step intermediate reasoning paths, enabling the model to mimic the logical progression on new queries.",
      "distractors": [
        "Few-Shot CoT provides exemplar demonstrations that include explicit reasoning chains.",
        "Zero-shot provides no demonstrations.",
        "RCF is an anomaly detection algorithm.",
        "Quantization lowers weight precision."
      ],
      "examTrap": "Demonstration examples + step-by-step reasoning = Few-Shot Chain-of-Thought (Few-Shot CoT).",
      "diagramKey": "bedrock_agent",
      "consoleViewKey": "bedrock_agent_console",
      "lessonId": "prompt",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
    },
    {
      "id": "e3_q18",
      "examId": 3,
      "questionNumber": 18,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Hallucination vs Factual Accuracy",
      "type": "single",
      "scenario": "When an FM generates a response about historical events, it describes a fictional battle that never occurred, complete with invented dates and generals.",
      "question": "What causes this behavior in foundation models?",
      "options": [
        "Foundation models predict probable token continuations based on statistical distributions rather than querying a structured database of truth.",
        "The model's temperature was set to exactly zero.",
        "The EC2 instance running the model overheated.",
        "The user did not specify an IAM role."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Foundation models are statistical pattern-matching engines that generate mathematically likely token sequences; they lack intrinsic concept of objective truth and will generate plausible-sounding falsehoods if ungrounded.",
      "distractors": [
        "FMs predict probable next tokens based on statistical associations, not verified truth lookup.",
        "Temperature of 0 reduces hallucination compared to higher temperatures.",
        "Hardware temperatures do not alter semantic logic.",
        "IAM controls authorization, not linguistic factual accuracy."
      ],
      "examTrap": "LLMs predict statistically plausible tokens, not ground truth -> Hallucination risk without RAG grounding.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "hallucination",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
    },
    {
      "id": "e3_q19",
      "examId": 3,
      "questionNumber": 19,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Inference Parameters - Max Tokens",
      "type": "single",
      "scenario": "A developer calls an LLM to generate a comprehensive 5-page report. The output abruptly cuts off halfway through sentence four on page two.",
      "question": "Which parameter should the developer increase to allow the model to finish generating the full text?",
      "options": [
        "Maximum Generation Length (Max Tokens)",
        "Temperature",
        "Top-P",
        "Top-K"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Maximum Generation Length (or Max Tokens) specifies the maximum number of tokens the model is permitted to generate in its response. Setting this value too low causes generation to truncate prematurely mid-sentence.",
      "distractors": [
        "Max tokens sets the ceiling on generated output tokens.",
        "Temperature alters randomness, not generation length limit.",
        "Top-P alters sampling probability thresholds.",
        "Top-K restricts candidate token pools."
      ],
      "examTrap": "Response abruptly cut off mid-sentence = Max Generation Length (Max Tokens) too low.",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "sampling",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
    },
    {
      "id": "e3_q20",
      "examId": 3,
      "questionNumber": 20,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "RAG Pipeline - Chunking Trade-offs",
      "type": "single",
      "scenario": "A machine learning practitioner is reviewing generative AI requirements.",
      "question": "An engineer is tuning chunk sizes for Bedrock Knowledge Bases. What is the consequence of selecting a chunk size that is excessively large (e.g. 8,000 tokens per chunk)?",
      "options": [
        "Chunks become semantically diluted with unrelated topics, reducing retrieval precision.",
        "Bedrock will refuse to encrypt the S3 bucket.",
        "CloudTrail will stop logging API calls.",
        "The vector database converts into a relational database."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Excessively large chunks cover multiple distinct topics, diluting the embedding vector and reducing retrieval precision. Conversely, excessively small chunks lack sufficient context to be meaningful.",
      "distractors": [
        "Overly large chunks dilute semantic focus, degrading vector search precision.",
        "S3 encryption is unaffected by chunk size.",
        "CloudTrail logs API calls independently.",
        "Vector databases remain vector stores regardless of chunk size."
      ],
      "examTrap": "Excessively large chunks = semantic dilution and lower retrieval precision.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "rag",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
    },
    {
      "id": "e3_q21",
      "examId": 3,
      "questionNumber": 21,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Fine-Tuning - Data Quality Importance",
      "type": "single",
      "scenario": "A company prepares 50,000 question-answer pairs to fine-tune an Amazon Titan model. Many answers contain grammatical errors, conflicting instructions, and incorrect facts.",
      "question": "What will be the impact of fine-tuning on this low-quality dataset?",
      "options": [
        "The model will learn and replicate the errors, hallucinations, and low-quality patterns present in the data ('garbage in, garbage out').",
        "The model will automatically correct all grammatical errors and fact-check itself.",
        "AWS KMS will reject the training job.",
        "The model's context window will expand to 1 million tokens."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Fine-tuning directly aligns model weights to the provided training examples. If training data contains inaccuracies, poor phrasing, or contradictions, the fine-tuned model will internalize and reproduce these flaws.",
      "distractors": [
        "Models learn whatever distribution is presented; low quality data degrades fine-tuned outputs.",
        "Models do not autonomously fact-check training datasets.",
        "KMS performs cryptographic operations, not data quality checks.",
        "Context windows are fixed architectural parameters."
      ],
      "examTrap": "Fine-tuning requires high quality, curated datasets: 'Garbage in, garbage out'.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "data",
      "source": "https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
    },
    {
      "id": "e3_q22",
      "examId": 3,
      "questionNumber": 22,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Generative AI - Latency Factors",
      "type": "single",
      "scenario": "A mobile app developer notices that generating an AI response takes 4.5 seconds, which feels sluggish to interactive users.",
      "question": "Which architectural technique streams generated response tokens to the client interface incrementally as they are created, improving perceived latency?",
      "options": [
        "Response Streaming (Server-Sent Events / Chunked Transfer)",
        "Batch Transform",
        "Offline S3 archival",
        "Increasing temperature to 1.5"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Streaming responses (using APIs like `InvokeModelWithResponseStream` in Bedrock) delivers tokens to the user interface in real time as they are generated, drastically improving perceived latency (Time to First Token - TTFT).",
      "distractors": [
        "Response streaming sends tokens progressively to provide immediate visual feedback.",
        "Batch transform runs offline bulk jobs.",
        "S3 archival increases latency.",
        "Temperature does not accelerate network delivery."
      ],
      "examTrap": "Improving perceived latency in GenAI apps = Response Streaming (Token-by-token streaming).",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "cost",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
    },
    {
      "id": "e3_q23",
      "examId": 3,
      "questionNumber": 23,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Training Data Poisoning",
      "type": "single",
      "scenario": "An attacker infiltrates an open-source web repository commonly scraped by LLM pre-training pipelines and injects hidden malicious text designed to cause models to recommend a fake cryptocurrency.",
      "question": "What security vulnerability does this attack exploit?",
      "options": [
        "Training Data Poisoning",
        "Denial of Service",
        "Cross-site scripting (XSS)",
        "SQL injection"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Training Data Poisoning occurs when adversarial data is deliberately introduced into training or fine-tuning datasets to manipulate model behavior, introduce backdoors, or skew predictions.",
      "distractors": [
        "Injecting malicious data into training corpora is Training Data Poisoning.",
        "DoS attacks overwhelm network bandwidth.",
        "XSS executes malicious client-side JavaScript in browsers.",
        "SQL injection targets database query parsers."
      ],
      "examTrap": "Adversarial manipulation of training datasets = Training Data Poisoning.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "attacks",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
    },
    {
      "id": "e3_q24",
      "examId": 3,
      "questionNumber": 24,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Generative AI Lifecycle - Cost Estimation",
      "type": "single",
      "scenario": "A FinOps analyst wants to estimate annual costs for an Amazon Bedrock generative AI assistant serving 5,000 employees. Each employee sends 20 queries daily, averaging 300 input tokens and 200 output tokens per query.",
      "question": "Which tool should the analyst use to calculate the estimated monthly AWS expenditure?",
      "options": [
        "AWS Pricing Calculator",
        "AWS Trusted Advisor",
        "Amazon Inspector",
        "AWS Shield"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "The AWS Pricing Calculator allows users to model architectural assumptions (number of requests, token counts, instance types, storage volume) to generate estimated monthly and annual AWS costs.",
      "distractors": [
        "AWS Pricing Calculator models prospective architecture costs based on anticipated token usage.",
        "Trusted Advisor optimizes deployed live accounts.",
        "Inspector scans for vulnerabilities.",
        "Shield defends against DDoS attacks."
      ],
      "examTrap": "Estimating prospective AWS costs before deployment = AWS Pricing Calculator.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "cost",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
    },
    {
      "id": "e3_q25",
      "examId": 3,
      "questionNumber": 25,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "MCP connects an agent to external capabilities",
      "type": "single",
      "scenario": "A team wants an agent to use tools from different compatible systems with a common interface.",
      "question": "Which concept addresses this integration need?",
      "options": [
        "Model Context Protocol (MCP)",
        "Low-rank adaptation (LoRA)",
        "ROUGE evaluation",
        "Principal component analysis (PCA)"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Model Context Protocol provides a common way for an AI application to discover and use capabilities exposed by compatible servers. It reduces custom integration work; it does not replace access control.",
      "distractors": [
        "MCP standardizes connections to compatible capabilities.",
        "LoRA adapts model parameters.",
        "ROUGE evaluates text overlap.",
        "PCA reduces feature dimensions."
      ],
      "examTrap": "Treat tool output as untrusted data. A protocol describes communication; permissions determine what is allowed.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_agent_console",
      "lessonId": "mcp",
      "source": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html"
    },
    {
      "id": "e3_q26",
      "examId": 3,
      "questionNumber": 26,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Temperature vs Top-P Interaction",
      "type": "single",
      "scenario": "When configuring inference on Amazon Bedrock, AWS best practices recommend altering either Temperature OR Top-P, but NOT both simultaneously.",
      "question": "Why is this guidance recommended?",
      "options": [
        "Changing both simultaneously makes it difficult to isolate which parameter caused output variations or degradation.",
        "The Bedrock API throws a validation exception if both are provided.",
        "Top-P and Temperature are identical mathematical formulas.",
        "Changing both invalidates the AWS KMS encryption key."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Both Temperature and Top-P modify the token probability distribution and sampling randomness. Altering both at the same time confounds evaluation, making it difficult to systematically determine which hyperparameter influenced generation quality.",
      "distractors": [
        "Modifying both makes it difficult to isolate parameter effects during tuning.",
        "The API accepts both parameters simultaneously.",
        "Temperature flattens the distribution; Top-P truncates the tail.",
        "Sampling hyperparameters do not affect encryption."
      ],
      "examTrap": "Best practice: Tune either Temperature OR Top-P, not both at once, to isolate tuning effects.",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "sampling",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
    },
    {
      "id": "e3_q27",
      "examId": 3,
      "questionNumber": 27,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "AI tasks and modalities",
      "type": "matching",
      "scenario": "A product team is choosing capabilities for an application.",
      "question": "Match each requirement to the appropriate capability.",
      "options": [
        "Multimodal understanding",
        "Image generation",
        "Text generation",
        "Embedding-based retrieval"
      ],
      "correctAnswers": [
        2,
        3,
        0,
        1
      ],
      "explanation": "Choose the capability based on the input and required output. Generation creates content, embeddings support similarity search, and multimodal understanding combines supported input types.",
      "distractors": [
        "Uses multiple supported input modalities.",
        "Produces an image.",
        "Produces text.",
        "Retrieves by semantic similarity."
      ],
      "examTrap": "Identify inputs and outputs before picking a model.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "prebuilt_ai_console",
      "prompts": [
        "Create new marketing copy",
        "Find semantically similar passages",
        "Answer questions using both a photo and text",
        "Create an image from a description"
      ],
      "lessonId": "multimodal",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
    },
    {
      "id": "e3_q28",
      "examId": 3,
      "questionNumber": 28,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Evaluating FM Bias - Toxicity Benchmarks",
      "type": "single",
      "scenario": "A machine learning practitioner is reviewing generative AI requirements.",
      "question": "An AI research lab is using the RealToxicityPrompts benchmark to evaluate foundation models on Amazon Bedrock. What does this benchmark specifically measure?",
      "options": [
        "The propensity of a foundation model to generate toxic, hateful, or abusive completions when given provocative prompts.",
        "The time it takes for an EC2 instance to reboot.",
        "The latency of an Aurora PostgreSQL database query.",
        "The number of active IAM users in an organization."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "RealToxicityPrompts is a standard AI safety benchmark designed to evaluate how frequently and severely foundation models generate toxic, offensive, or derogatory language when exposed to challenging prompt prefixes.",
      "distractors": [
        "RealToxicityPrompts measures toxic generation rates under adversarial prompt conditions.",
        "EC2 reboot speed is an infrastructure metric.",
        "Aurora latency is a database metric.",
        "IAM user count is an identity governance metric."
      ],
      "examTrap": "Evaluating toxic / offensive language generation = Toxicity benchmarks (RealToxicityPrompts).",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "evaluation",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
    },
    {
      "id": "e3_q29",
      "examId": 3,
      "questionNumber": 29,
      "domain": 2,
      "domainTitle": "Domain 2: Fundamentals of Generative AI",
      "subtopic": "Multi-Response (Generative AI Parameters)",
      "type": "multiple",
      "scenario": "A developer wants to make an LLM on Amazon Bedrock produce highly focused, conservative, and predictable outputs for legal document summarization.",
      "question": "Which TWO parameter settings support this goal? (Select TWO)",
      "options": [
        "Set Temperature to a low value (e.g., 0.1).",
        "Set Top-P to a lower threshold (e.g., 0.7) to restrict candidate token sampling.",
        "Set Temperature to 1.8 for maximum lexical diversity.",
        "Increase Top-K to 500 to expand candidate words.",
        "Remove all Stop Sequences."
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": "Lower temperature and a narrower supported sampling pool generally reduce variation. Parameter combinations vary by model, and exact repeatability is not guaranteed.",
      "distractors": [
        "Low temperature ensures deterministic, conservative token selection.",
        "Lower Top-P narrows candidate token selection to highest-probability tokens.",
        "High temperature creates randomness and hallucinations.",
        "High Top-K increases candidate pool, increasing variability.",
        "Stop sequences control halting, not conservative vocabulary."
      ],
      "examTrap": "Conservative & deterministic generation = Low Temperature + Low Top-P.",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "sampling",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html"
    },
    {
      "id": "e3_q30",
      "examId": 3,
      "questionNumber": 30,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Rekognition - DetectLabels vs DetectFaces",
      "type": "single",
      "scenario": "A media company wants to analyze a library of 100,000 photos to detect visual objects (such as 'car', 'sunset', 'dog') and activities (such as 'surfing', 'running') to build a searchable media catalog.",
      "question": "Which Amazon Rekognition API should the company call?",
      "options": [
        "DetectLabels API",
        "DetectFaces API",
        "DetectModerationLabels API",
        "CompareFaces API"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Rekognition DetectLabels API identifies thousands of common objects, scenes, actions, and concepts in images and video, returning labels with confidence scores.",
      "distractors": [
        "DetectLabels identifies objects, scenes, and actions in images.",
        "DetectFaces analyzes facial attributes (emotions, eyes, smile).",
        "DetectModerationLabels detects unsafe or explicit content.",
        "CompareFaces checks facial similarity between two images."
      ],
      "examTrap": "Detecting objects, scenes, and actions in photos = Rekognition DetectLabels.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "rekognition",
      "source": "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
    },
    {
      "id": "e3_q31",
      "examId": 3,
      "questionNumber": 31,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Textract - AnalyzeID for Identity Documents",
      "type": "single",
      "scenario": "A mobile fintech app needs to verify customer identities during registration by automatically extracting First Name, Last Name, Date of Birth, and ID Number from user-submitted government passports and driver's licenses.",
      "question": "Which Amazon Textract API is specialized for extracting structured fields from government-issued identity documents?",
      "options": [
        "AnalyzeID API",
        "DetectDocumentText API",
        "AnalyzeDocument FORMS",
        "Amazon Rekognition Custom Labels"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Textract AnalyzeID is specialized for extracting normalized, structured identity fields (name, date of birth, expiration date, ID number) directly from government passports and driver's licenses without custom templates.",
      "distractors": [
        "AnalyzeID extracts structured identity data from passports and driver's licenses.",
        "DetectDocumentText returns raw un-normalized OCR text lines.",
        "FORMS is for general forms, but AnalyzeID is purpose-built for government IDs.",
        "Rekognition analyzes vision, not structured passport fields."
      ],
      "examTrap": "Extracting structured data from passports and driver's licenses = Amazon Textract AnalyzeID.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "textract",
      "source": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html"
    },
    {
      "id": "e3_q32",
      "examId": 3,
      "questionNumber": 32,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Comprehend Medical",
      "type": "single",
      "scenario": "A clinical research group needs to parse thousands of unstructured doctor's clinical notes to extract medical conditions, anatomical sites, dosages, medication brand names, and map them to standard ICD-10-CM codes.",
      "question": "Which specialized AWS AI service should the team deploy?",
      "options": [
        "Amazon Comprehend Medical",
        "Amazon Transcribe standard",
        "Amazon Rekognition",
        "Amazon SageMaker Data Wrangler"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Comprehend Medical is an HIPAA-eligible NLP service that uses deep learning to extract medical conditions, medications, dosages, and anatomical terminology from clinical text, linking entities to medical ontologies like ICD-10-CM and RxNorm.",
      "distractors": [
        "Comprehend Medical extracts clinical terminology and ontology codes (ICD-10, RxNorm).",
        "Transcribe converts speech audio to text.",
        "Rekognition processes images and video.",
        "Data Wrangler cleans tabular training datasets."
      ],
      "examTrap": "Extracting medical entities, dosages, and ICD-10 codes from clinical notes = Amazon Comprehend Medical.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "comprehend",
      "source": "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"
    },
    {
      "id": "e3_q33",
      "examId": 3,
      "questionNumber": 33,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Transcribe - Multi-Speaker Diarization",
      "type": "single",
      "scenario": "A legal transcription service uses Amazon Transcribe to produce written transcripts of court hearings and depositions. The legal team requires the transcript to clearly distinguish when the judge, defense attorney, and prosecutor are speaking.",
      "question": "Which Amazon Transcribe feature detects speaker changes and tags each spoken segment with a distinct speaker label (e.g. 'Speaker 0', 'Speaker 1')?",
      "options": [
        "Speaker Diarization (Speaker Identification)",
        "Custom Vocabulary",
        "Channel Identification",
        "SSML mark tags in Polly"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Speaker Diarization in Amazon Transcribe analyzes acoustic voice characteristics to detect speaker transitions and attribute speech segments to distinct speakers (e.g. Speaker 0, Speaker 1) throughout an audio recording.",
      "distractors": [
        "Speaker Diarization identifies and labels different speakers in audio.",
        "Custom Vocabulary teaches specialized terms, not speaker identities.",
        "Channel identification splits stereo channels (e.g. left vs right phone line).",
        "Polly SSML is for text-to-speech output."
      ],
      "examTrap": "'Identify and label who spoke when in multi-party audio' = Speaker Diarization in Amazon Transcribe.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "transcribe",
      "source": "https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"
    },
    {
      "id": "e3_q34",
      "examId": 3,
      "questionNumber": 34,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Polly - Neural TTS vs Standard TTS",
      "type": "single",
      "scenario": "A media publishing house converts audiobooks from written articles. The production team wants voices that produce the most natural, human-like speech with emotional expressiveness and accurate intonation.",
      "question": "Which Amazon Polly voice engine type should they select?",
      "options": [
        "Neural Text-to-Speech (NTTS)",
        "Standard Text-to-Speech",
        "Concatenative Speech Engine",
        "Amazon Lex engine"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Polly Neural Text-to-Speech (NTTS) delivers advanced, natural-sounding, and expressive voices that closely resemble human speech rhythms and intonation compared to legacy Standard TTS.",
      "distractors": [
        "Neural TTS provides the highest speech quality, natural intonation, and expressive delivery.",
        "Standard TTS sounds more synthetic and robotic.",
        "Concatenative is an older robotic synthesis technique.",
        "Lex is a conversational chatbot engine."
      ],
      "examTrap": "Most natural, human-like expressive voice in Amazon Polly = Neural TTS (NTTS).",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "polly",
      "source": "https://docs.aws.amazon.com/polly/latest/dg/what-is.html"
    },
    {
      "id": "e3_q35",
      "examId": 3,
      "questionNumber": 35,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Q Business vs Kendra Integration",
      "type": "single",
      "scenario": "An enterprise wants to know the architectural relationship between Amazon Kendra and Amazon Q Business.",
      "question": "Which statement accurately describes how Amazon Q Business relates to Amazon Kendra?",
      "options": [
        "Amazon Q Business builds on top of Amazon Kendra's semantic indexing capabilities and adds generative conversational synthesis, 40+ connectors, and actions.",
        "Amazon Q Business only searches code repositories in GitHub.",
        "Amazon Kendra is a text-to-speech engine, while Q Business is a database.",
        "Amazon Kendra has been discontinued and replaced with Amazon Polly."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Q Business leverages the deep semantic indexing technologies developed in Amazon Kendra and adds generative AI response synthesis, native conversational interfaces, 40+ enterprise data connectors, and action plugins.",
      "distractors": [
        "Q Business expands on Kendra's search engine with GenAI synthesis and enterprise actions.",
        "Q Developer searches code; Q Business searches corporate enterprise documents.",
        "Kendra is an enterprise search service.",
        "Kendra is an active search service."
      ],
      "examTrap": "Amazon Q Business provides GenAI conversational synthesis and enterprise connectors over semantic indexing.",
      "diagramKey": "q_business_arch",
      "consoleViewKey": "q_business_console",
      "lessonId": "qbusiness",
      "source": "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html"
    },
    {
      "id": "e3_q36",
      "examId": 3,
      "questionNumber": 36,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Q Developer - Security Vulnerability Scanning",
      "type": "single",
      "scenario": "A software development team uses Amazon Q Developer in Visual Studio Code. During code writing, Q Developer automatically highlights a hard-coded AWS secret key and an unsafe SQL query vulnerable to injection.",
      "question": "Which Amazon Q Developer capability identified these software flaws?",
      "options": [
        "Automated Security Vulnerability Scanning",
        "Code Transformation",
        "Amazon Kendra Search",
        "Amazon Rekognition Custom Labels"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Q Developer scans code in real-time within developer IDEs to detect security vulnerabilities (such as OWASP/CWE Top 25 flaws, hard-coded credentials, and injection bugs) and generates automated remediations.",
      "distractors": [
        "Q Developer scans code for security vulnerabilities and secrets leakage.",
        "Code Transformation updates programming language versions (e.g. Java 8 to 17).",
        "Kendra searches documents.",
        "Rekognition analyzes photos."
      ],
      "examTrap": "Detecting security flaws and hardcoded secrets in IDE code = Amazon Q Developer Security Scan.",
      "diagramKey": "q_developer_arch",
      "consoleViewKey": "q_developer_console",
      "lessonId": "qdeveloper",
      "source": "https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html"
    },
    {
      "id": "e3_q37",
      "examId": 3,
      "questionNumber": 37,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Textract - TABLES Feature Type",
      "type": "single",
      "scenario": "A financial auditor processes PDF bank statements containing multi-column tabular transaction records with columns for 'Date', 'Description', 'Withdrawal', and 'Balance'.",
      "question": "Which Amazon Textract feature type accurately preserves row, column, and cell relationships in tables?",
      "options": [
        "TABLES feature type",
        "DetectDocumentText API",
        "FORMS feature type",
        "Amazon Polly"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Textract AnalyzeDocument with the TABLES feature type extracts tabular structures, accurately capturing row, column, and cell spans, headers, and grid relationships for export into CSV or Excel.",
      "distractors": [
        "TABLES extracts structured tabular grids preserving rows and columns.",
        "DetectDocumentText outputs flat text strings without cell boundaries.",
        "FORMS extracts key-value pairs (Name: Value), not grid tables.",
        "Polly is a text-to-speech service."
      ],
      "examTrap": "Extracting tables, rows, and columns from financial statements = Amazon Textract TABLES.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "textract",
      "source": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html"
    },
    {
      "id": "e3_q38",
      "examId": 3,
      "questionNumber": 38,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Personalize - Use Cases",
      "type": "single",
      "scenario": "An online fashion retail store wants to dynamically re-order its homepage product listings for each logged-in shopper based on their individual browsing history, brand preferences, and previous purchases.",
      "question": "Which managed AWS service provides this personalization capability?",
      "options": [
        "Amazon Personalize",
        "Amazon Comprehend",
        "Amazon Polly",
        "AWS Glue DataBrew"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Personalize delivers real-time personalized recommendations, personalized search ranking, and user segmentation using pre-built machine learning algorithms developed by Amazon.",
      "distractors": [
        "Amazon Personalize tailors product rankings and recommendations to individual user preferences.",
        "Comprehend is an NLP service.",
        "Polly is a speech synthesis service.",
        "Glue DataBrew cleans data."
      ],
      "examTrap": "'Personalized product recommendations and customized user ranking' = Amazon Personalize.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "personalize",
      "source": "https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html"
    },
    {
      "id": "e3_q39",
      "examId": 3,
      "questionNumber": 39,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Bedrock Agents - OpenAPI 3.0 Schema Role",
      "type": "single",
      "scenario": "When configuring an Action Group in an Amazon Bedrock Agent, a developer must provide an OpenAPI 3.0 schema file.",
      "question": "What is the function of this schema file in the Agent's operation?",
      "options": [
        "It defines the API endpoints, operations, and input/output parameter signatures that the Agent can invoke via Lambda.",
        "It encrypts the user's password using AES-256.",
        "It converts audio files to text.",
        "It generates synthetic training images."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "The OpenAPI 3.0 schema provides the machine-readable API contract that describes available API operations, HTTP methods, required parameters, and data types so the Bedrock Agent can determine which API to call and how to construct the payload.",
      "distractors": [
        "OpenAPI schema specifies the API operations and parameter contracts for Agent action groups.",
        "Encryption is handled by AWS KMS.",
        "Audio-to-text is handled by Transcribe.",
        "Titan Image Generator produces images."
      ],
      "examTrap": "OpenAPI 3.0 schema in Bedrock Agents defines the API operations and parameters that Lambda can execute.",
      "diagramKey": "bedrock_agent",
      "consoleViewKey": "bedrock_agent_console",
      "lessonId": "agents",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html"
    },
    {
      "id": "e3_q40",
      "examId": 3,
      "questionNumber": 40,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Bedrock Knowledge Bases - Semantic Chunking",
      "type": "single",
      "scenario": "A documentation team is configuring an Amazon Bedrock Knowledge Base. Rather than splitting documents into fixed 300-token blocks that might cut a paragraph in half, they want documents split naturally when the subject matter or topic meaning shifts.",
      "question": "Which chunking strategy fulfills this requirement?",
      "options": [
        "Semantic Chunking",
        "Fixed-size Chunking",
        "No Chunking",
        "Random Cut Forest"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Semantic Chunking evaluates natural linguistic shifts in topic and meaning, breaking text into distinct chunks based on topical coherence rather than arbitrary token counts, maintaining paragraph integrity.",
      "distractors": [
        "Semantic chunking splits text on natural topic/semantic boundaries.",
        "Fixed-size chunking splits by rigid token counts.",
        "No chunking ingests entire documents as monolithic units.",
        "RCF is an anomaly detection algorithm."
      ],
      "examTrap": "Splitting documents based on natural topic shifts rather than token count = Semantic Chunking.",
      "diagramKey": "bedrock_rag",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "rag",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
    },
    {
      "id": "e3_q41",
      "examId": 3,
      "questionNumber": 41,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Comprehend - Custom Entity Recognition",
      "type": "single",
      "scenario": "A law firm needs to extract proprietary internal case matter codes (e.g. 'MAT-9482-X') and internal litigation project names from legal briefs that standard pre-trained NLP models do not recognize.",
      "question": "Which Amazon Comprehend capability enables training an NLP model on a custom list of company-specific entity types?",
      "options": [
        "Amazon Comprehend Custom Entity Recognition",
        "Amazon Textract Queries",
        "Amazon Rekognition Custom Labels",
        "AWS CodeBuild"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Comprehend Custom Entity Recognition allows users to train a custom NLP model using their own domain text and annotations to identify private, industry-specific entity types that are not recognized by standard pre-trained models.",
      "distractors": [
        "Custom Entity Recognition identifies domain-specific entities unique to an enterprise.",
        "Textract Queries extracts text fields from scanned images.",
        "Rekognition Custom Labels trains vision models for images.",
        "CodeBuild compiles code."
      ],
      "examTrap": "Extracting specialized entity terms not in standard NLP models = Comprehend Custom Entity Recognition.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "comprehend",
      "source": "https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"
    },
    {
      "id": "e3_q42",
      "examId": 3,
      "questionNumber": 42,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Lex - Slot Types",
      "type": "single",
      "scenario": "In an Amazon Lex chatbot for booking airline tickets, the developer needs a slot to collect the user's destination city. Lex provides built-in catalogs of global cities.",
      "question": "What type of slot should the developer use?",
      "options": [
        "Built-in Slot Type (e.g., `AMAZON.City`)",
        "Custom Lambda Slot",
        "Regular Expression Bucket",
        "S3 Tag"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Lex provides Built-in Slot Types (such as `AMAZON.City`, `AMAZON.Date`, `AMAZON.Number`, `AMAZON.PhoneNumber`) with pre-trained natural language recognition for common conversational entities, saving development time.",
      "distractors": [
        "Built-in slot types like AMAZON.City provide pre-configured recognition for standard entities.",
        "Custom Lambda validates slots, but is not the slot type itself.",
        "Regex is for custom patterns, but cities are built-in.",
        "S3 tags manage storage objects."
      ],
      "examTrap": "Pre-trained common entity recognizers in Lex (cities, dates, numbers) = Built-in Slot Types (AMAZON.*).",
      "diagramKey": "bedrock_agent",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "lex",
      "source": "https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html"
    },
    {
      "id": "e3_q43",
      "examId": 3,
      "questionNumber": 43,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Translate - Language Detection",
      "type": "single",
      "scenario": "A global customer support portal receives inquiries in dozens of languages. Before routing the text to Amazon Translate, the system must automatically identify what language the customer wrote in.",
      "question": "Which Amazon Comprehend or Translate feature detects the dominant language in a text document?",
      "options": [
        "Amazon Comprehend Dominant Language Detection",
        "Amazon Rekognition DetectText",
        "Amazon Polly Voice Engine",
        "Amazon Macie PII"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Comprehend Dominant Language Detection inspects text and returns the primary language code (e.g. 'en', 'es', 'fr', 'de') along with a confidence score, enabling automatic translation routing.",
      "distractors": [
        "Dominant Language Detection automatically identifies the language of input text.",
        "Rekognition detects visual text inside images.",
        "Polly generates spoken audio.",
        "Macie detects sensitive PII."
      ],
      "examTrap": "Identifying what language an incoming document is written in = Dominant Language Detection.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "translate",
      "source": "https://docs.aws.amazon.com/translate/latest/dg/what-is.html"
    },
    {
      "id": "e3_q44",
      "examId": 3,
      "questionNumber": 44,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Polly - Custom Lexicons",
      "type": "single",
      "scenario": "A medical educational podcast company uses Amazon Polly to read medical textbooks. Polly mispronounces a specific chemical compound name 'Xanthophyll' as 'Zantho-fill' instead of 'Zan-tho-feel'.",
      "question": "Which Amazon Polly feature allows providing pronunciation rules for specific words using phonemes or graphemes?",
      "options": [
        "Amazon Polly Custom Lexicons",
        "Amazon Transcribe Custom Vocabulary",
        "Amazon Kendra Dictionary",
        "AWS IAM Policy"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Polly Custom Lexicons allow developers to customize the pronunciation of words (such as acronyms, foreign words, or medical compounds) across an account using standard W3C Pronunciation Lexicon Specification (PLS).",
      "distractors": [
        "Custom Lexicons customize speech pronunciation in Amazon Polly.",
        "Custom Vocabulary is for speech-to-text in Transcribe.",
        "Kendra dictionary tunes document search indexing.",
        "IAM controls permissions."
      ],
      "examTrap": "Customizing word pronunciation in Polly = Custom Lexicons. Customizing vocabulary in Transcribe = Custom Vocabulary.",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "polly",
      "source": "https://docs.aws.amazon.com/polly/latest/dg/what-is.html"
    },
    {
      "id": "e3_q45",
      "examId": 3,
      "questionNumber": 45,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Bedrock Guardrails - Word Filters",
      "type": "single",
      "scenario": "A sports apparel manufacturer deploys a customer chatbot using Amazon Bedrock. The marketing team mandates that the bot must never mention names of five rival competitor shoe brands under any circumstance.",
      "question": "Which Amazon Bedrock Guardrail capability allows specifying a custom list of blocked brand names to censor or block?",
      "options": [
        "Word Filters (Custom Word Blacklist)",
        "Denied Topics",
        "Sensitive Information Filters",
        "Contextual Grounding"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Word Filters in Amazon Bedrock Guardrails allow administrators to configure a custom blacklist of exact words or phrases (such as competitor brand names or offensive jargon) to be blocked or censored in prompts and completions.",
      "distractors": [
        "Word Filters block exact words or CSV lists of competitor terms in Bedrock Guardrails.",
        "Denied topics block broad conversational themes using natural language descriptions.",
        "Sensitive Information filters detect PII (SSNs, cards).",
        "Contextual Grounding checks factual hallucination."
      ],
      "examTrap": "Blocking specific brand names or exact word lists = Word Filters in Bedrock Guardrails.",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "guardrails",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
    },
    {
      "id": "e3_q46",
      "examId": 3,
      "questionNumber": 46,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Amazon Rekognition - Face Search vs Face Detection",
      "type": "single",
      "scenario": "A corporate office uses computer vision cameras at turnstiles. The system must verify whether an employee walking up to the door matches an existing enrolled database of 500 employee badge photos.",
      "question": "Which Amazon Rekognition feature performs 1-to-many facial search against a stored collection of face vectors?",
      "options": [
        "SearchFacesByImage API (Face Collections)",
        "DetectFaces API",
        "DetectLabels API",
        "Amazon Textract AnalyzeID"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Rekognition Face Collections store vector facial representations, and the `SearchFacesByImage` API compares an input face against all faces in the collection (1-to-many matching) to identify a person.",
      "distractors": [
        "SearchFacesByImage searches a face against an enrolled collection of faces (1-to-many).",
        "DetectFaces only extracts facial attributes (eyes open, smiling) without matching identity.",
        "DetectLabels identifies general objects.",
        "Textract AnalyzeID parses ID document text."
      ],
      "examTrap": "1-to-many matching against a database of authorized faces = Rekognition SearchFacesByImage (Collections).",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "rekognition",
      "source": "https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html"
    },
    {
      "id": "e3_q47",
      "examId": 3,
      "questionNumber": 47,
      "domain": 3,
      "domainTitle": "Domain 3: Applications of Foundation Models",
      "subtopic": "Multi-Response (Intelligent Document Processing Pipeline)",
      "type": "multiple",
      "scenario": "An enterprise wants to build an automated Intelligent Document Processing (IDP) pipeline for loan applications uploaded to Amazon S3. The pipeline must extract form fields, detect customer sentiment in personal statements, and redact applicant Social Security Numbers.",
      "question": "Which TWO AWS managed AI services should be combined to implement this architecture? (Select TWO)",
      "options": [
        "Amazon Textract (using FORMS and Queries to extract structured data)",
        "Amazon Comprehend (to analyze sentiment and detect/redact sensitive PII)",
        "Amazon Polly (to generate audio readouts of loan terms)",
        "Amazon Forecast (to predict future weather)",
        "AWS DeepRacer (to train autonomous cars)"
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": "A modern Intelligent Document Processing (IDP) architecture on AWS pairs Amazon Textract (for OCR, form field, and table extraction from scanned PDFs) with Amazon Comprehend (for NLP sentiment analysis, entity extraction, and PII detection/redaction).",
      "distractors": [
        "Textract extracts form key-value pairs and tables from documents.",
        "Comprehend analyzes sentiment and detects/redacts PII in text.",
        "Polly converts text into speech audio.",
        "Forecast predicts numerical time-series.",
        "DeepRacer is for reinforcement learning car racing."
      ],
      "examTrap": "Standard AWS IDP pipeline = Amazon Textract (document extraction) + Amazon Comprehend (NLP/PII).",
      "diagramKey": "prebuilt_ai_pipeline",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "textract",
      "source": "https://docs.aws.amazon.com/textract/latest/dg/what-is.html"
    },
    {
      "id": "e3_q48",
      "examId": 3,
      "questionNumber": 48,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Model Explainability Importance",
      "type": "single",
      "scenario": "A cloud engineer is reviewing AWS managed AI architecture requirements.",
      "question": "Why is model explainability essential when deploying machine learning in regulated industries such as healthcare, employment hiring, and mortgage lending?",
      "options": [
        "Regulators mandate that affected individuals understand why decisions were made, and developers must audit models for discriminatory logic.",
        "Explainability makes deep learning models train 10 times faster.",
        "Explainability eliminates the need for AWS KMS encryption.",
        "Explainable models are legally exempt from paying cloud hosting fees."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "In regulated sectors, explainability is a legal requirement (e.g. Adverse Action Notices under ECOA, right to explanation under GDPR). It allows stakeholders to verify that decisions are based on legitimate business factors rather than protected demographic traits.",
      "distractors": [
        "Explainability satisfies regulatory compliance and ensures decisions are accountable and fair.",
        "Explainability does not increase training speed.",
        "Encryption is mandatory regardless of explainability.",
        "Cloud hosting fees apply to all services."
      ],
      "examTrap": "Purpose of explainability in regulated industries = Regulatory compliance & verifying non-discriminatory decisions.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "explain",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-explainability.html"
    },
    {
      "id": "e3_q49",
      "examId": 3,
      "questionNumber": 49,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Human Oversight & Accountability",
      "type": "single",
      "scenario": "An automated AI system approves and denies commercial business loans. The company establishes a policy that any loan application over $500,000 flagged for denial by the model must be reviewed by a human senior underwriter before the rejection is finalized.",
      "question": "Which Responsible AI pillar is demonstrated by this policy?",
      "options": [
        "Governance and Accountability (Human-in-the-Loop oversight)",
        "Scalability",
        "Data minimization",
        "Network latency optimization"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "The Governance and Accountability pillar requires organizational oversight, human accountability, and human-in-the-loop validation for high-stakes automated decisions that substantially impact people's livelihoods.",
      "distractors": [
        "Human underwriter review of high-stakes AI rejections exemplifies Governance & Accountability.",
        "Scalability is an operational infrastructure property.",
        "Data minimization is a privacy practice.",
        "Latency is a network speed metric."
      ],
      "examTrap": "Human review for high-stakes AI automated decisions = Governance and Accountability (Human-in-the-Loop).",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "human",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-getting-started.html"
    },
    {
      "id": "e3_q50",
      "examId": 3,
      "questionNumber": 50,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "SageMaker Clarify - Bias Mitigation via Loss Re-weighting",
      "type": "single",
      "scenario": "A data scientist detects pre-training label disparity using SageMaker Clarify DPL. The minority group historically received fewer loan approvals due to small sample size.",
      "question": "How can the data scientist adjust the loss function during model training to penalize misclassifications on minority samples more heavily?",
      "options": [
        "Apply class weights / sample re-weighting to the loss function",
        "Delete all minority records from the dataset",
        "Disable feature selection",
        "Switch to Amazon Polly"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Sample re-weighting assigns higher loss penalties to errors made on underrepresented or disfavored demographic groups, forcing the model's optimization algorithm to pay equal attention to minority class patterns.",
      "distractors": [
        "Applying class weights penalizes minority misclassifications more heavily during training.",
        "Deleting minority samples worsens representation.",
        "Disabling feature selection does not address class imbalance.",
        "Polly is a text-to-speech engine."
      ],
      "examTrap": "Penalizing minority errors more heavily in training = Class Weighting / Sample Re-weighting in loss function.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "bias",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-detect-data-bias.html"
    },
    {
      "id": "e3_q51",
      "examId": 3,
      "questionNumber": 51,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Transparency through Model Documentation",
      "type": "single",
      "scenario": "An enterprise adopts an internal AI governance policy requiring all machine learning models to have verifiable documentation of training hyperparameters, evaluation metrics, intended use cases, and known edge-case limitations.",
      "question": "Which AWS tool provides standardized templates to author and publish this documentation directly inside SageMaker?",
      "options": [
        "Amazon SageMaker Model Cards",
        "AWS Billing Conductor",
        "Amazon SQS Dead Letter Queue",
        "AWS Transit Gateway"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon SageMaker Model Cards provide a centralized, standardized repository to record critical model details—such as intended use, evaluation metrics, training parameters, and risk mitigation—to ensure transparency and compliance.",
      "distractors": [
        "SageMaker Model Cards document model lifecycle, parameters, intended uses, and ethical boundaries.",
        "Billing Conductor manages chargeback accounting.",
        "SQS DLQ handles failed messages.",
        "Transit Gateway connects VPCs."
      ],
      "examTrap": "'Standardized documentation of model parameters, evaluation, and limitations' = SageMaker Model Cards.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "cards",
      "source": "https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html"
    },
    {
      "id": "e3_q52",
      "examId": 3,
      "questionNumber": 52,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Hallucination Risk in High-Stakes Domains",
      "type": "single",
      "scenario": "A healthcare startup considers using an LLM to generate automated prescription dosages directly for patients without doctor review. The risk analysis flags catastrophic liability if the model invents a dangerous medication dosage.",
      "question": "What is the recommended Responsible AI design pattern for high-stakes generative AI workflows?",
      "options": [
        "Always implement human-in-the-loop expert review before acting on high-stakes generative outputs.",
        "Double the model temperature to ensure variety.",
        "Remove all Guardrails to allow creative diagnosis.",
        "Use a smaller token context window."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "In high-stakes domains (healthcare, criminal justice, high-value finance), generative AI outputs must never be executed autonomously without human-in-the-loop expert validation, because foundation models can hallucinate.",
      "distractors": [
        "High-stakes generative outputs mandate human-in-the-loop expert verification.",
        "Higher temperature increases hallucinations.",
        "Removing guardrails increases risk.",
        "Truncating context impairs comprehension."
      ],
      "examTrap": "Generative AI in high-stakes domains (healthcare/finance) MUST incorporate Human-in-the-Loop review.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "hallucination",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
    },
    {
      "id": "e3_q53",
      "examId": 3,
      "questionNumber": 53,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "SageMaker Clarify - Foundation Model Evaluation",
      "type": "single",
      "scenario": "An engineering team wants to benchmark foundation models on Amazon Bedrock to evaluate toxicity, factual accuracy, and prompt attack resilience using standardized automated test datasets.",
      "question": "Which SageMaker capability evaluates foundation models across these Responsible AI dimensions?",
      "options": [
        "Amazon SageMaker Clarify Foundation Model Evaluation",
        "Amazon SageMaker Edge Manager",
        "Amazon SageMaker Neo",
        "AWS Elastic Beanstalk"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon SageMaker Clarify supports Foundation Model Evaluation, allowing teams to evaluate, benchmark, and compare LLMs on Amazon Bedrock and JumpStart across parameters like accuracy, robustness, toxicity, and semantic bias.",
      "distractors": [
        "SageMaker Clarify evaluates foundation models for toxicity, accuracy, and bias.",
        "Edge Manager manages ML models on IoT devices.",
        "SageMaker Neo compiles models for edge hardware.",
        "Elastic Beanstalk deploys web apps."
      ],
      "examTrap": "Evaluating foundation models for toxicity, bias, and robustness = SageMaker Clarify FM Evaluation.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "evaluation",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
    },
    {
      "id": "e3_q54",
      "examId": 3,
      "questionNumber": 54,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Data Privacy & Consent",
      "type": "single",
      "scenario": "A company collects customer phone conversations for customer support quality reviews. The analytics team wants to use these audio recordings to train a public commercial speech recognition model.",
      "question": "Under responsible AI and privacy governance principles, what must the company verify before using customer data for model training?",
      "options": [
        "That explicit customer consent and legal authorization was obtained to use their personal audio data for secondary model training.",
        "That the audio files are converted to MP3 format.",
        "That the training job runs in us-east-1.",
        "That the model achieves at least 95% accuracy."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Data privacy principles require organizations to adhere to data purpose limitation and obtain explicit legal consent from users before utilizing their personal data for secondary purposes such as machine learning model training.",
      "distractors": [
        "Data privacy mandates explicit user consent and legitimate purpose authorization.",
        "Audio format does not confer legal privacy rights.",
        "AWS region does not substitute for user consent.",
        "Model accuracy is independent of data collection legality."
      ],
      "examTrap": "Using customer data for AI model training requires explicit user consent and privacy compliance.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "responsible",
      "source": "https://aws.amazon.com/ai/responsible-ai/"
    },
    {
      "id": "e3_q55",
      "examId": 3,
      "questionNumber": 55,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Responsible AI - Transparency with Titan Image Watermarks",
      "type": "single",
      "scenario": "A cloud engineer is reviewing AWS managed AI architecture requirements.",
      "question": "Why did AWS implement invisible C2PA digital watermarking into all images generated by Amazon Titan Image Generator?",
      "options": [
        "To promote transparency and combat synthetic disinformation by providing a tamper-resistant way to verify AI-generated media provenance.",
        "To display AWS advertising logos on the images.",
        "To prevent images from downloading to mobile phones.",
        "To encrypt the image files with AES-256."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Provenance helps identify the origin of media. Titan Image Generator adds an invisible watermark and C2PA metadata. These are distinct mechanisms: one is an embedded signal, the other records content credentials. An invisible watermark is not the same as a C2PA credential. Neither proves the depicted event actually happened.",
      "distractors": [
        "Watermarking provides media provenance and transparency against synthetic disinformation.",
        "The watermark is invisible and contains no advertising.",
        "Watermarks do not prevent downloading.",
        "Watermarking is attribution metadata, not file encryption."
      ],
      "examTrap": "Provenance concerns origin, not truth.",
      "diagramKey": "bedrock_guardrails",
      "consoleViewKey": "prebuilt_ai_console",
      "lessonId": "provenance",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-image-models.html"
    },
    {
      "id": "e3_q56",
      "examId": 3,
      "questionNumber": 56,
      "domain": 4,
      "domainTitle": "Domain 4: Guidelines for Responsible AI",
      "subtopic": "Multi-Response (Responsible AI Pillars)",
      "type": "multiple",
      "scenario": "A company is conducting a Responsible AI review of their customer lending algorithms.",
      "question": "Which TWO actions directly support the Fairness and Explainability pillars? (Select TWO)",
      "options": [
        "Use SageMaker Clarify to compute pre-training DPL and post-training Disparate Impact (DI) metrics.",
        "Use SageMaker Clarify Kernel SHAP to generate feature attribution reports explaining individual denial decisions.",
        "Delete all model documentation and audit logs to protect developer intellectual property.",
        "Increase foundation model temperature to 1.9 to introduce random variation into credit approvals.",
        "Terminate all human credit reviewers to eliminate human overhead."
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": "Fairness is supported by auditing bias metrics (DPL and Disparate Impact) in SageMaker Clarify. Explainability is supported by Kernel SHAP feature attribution to explain the exact factors behind individual credit decisions.",
      "distractors": [
        "DPL and DI measure fairness and demographic parity.",
        "Kernel SHAP provides local explainability for credit decisions.",
        "Deleting documentation violates transparency and governance.",
        "High temperature causes chaotic, ungrounded decisions.",
        "Eliminating human reviewers removes governance oversight."
      ],
      "examTrap": "Fairness = Clarify bias metrics (DPL, DI). Explainability = Kernel SHAP feature attributions.",
      "diagramKey": "clarify_bias",
      "consoleViewKey": "clarify_console",
      "lessonId": "responsible",
      "source": "https://aws.amazon.com/ai/responsible-ai/"
    },
    {
      "id": "e3_q57",
      "examId": 3,
      "questionNumber": 57,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "Generative AI Security Scoping Matrix - Scope 1 vs Scope 3",
      "type": "single",
      "scenario": "An enterprise employee uses an unapproved public consumer web chatbot (e.g. public third-party website) to summarize confidential company quarterly financial statements.",
      "question": "Under which scope of the AWS Generative AI Security Scoping Matrix does this public consumer application fall, and what is the primary security risk?",
      "options": [
        "Scope 1; high risk of enterprise data leakage and loss of intellectual property control.",
        "Scope 3; fully protected by AWS enterprise SLAs.",
        "Scope 5; the customer manages underlying hypervisor patching.",
        "Scope 2; SSO integration guarantees complete privacy."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Scope 1 represents Consumer Applications (public third-party AI services). The customer has zero control over data handling, logging, or infrastructure, posing severe risks of proprietary data exposure and IP leakage.",
      "distractors": [
        "Scope 1 represents public consumer AI apps with maximum data leakage risk.",
        "Scope 3 is enterprise managed APIs like Amazon Bedrock, not consumer public web chat.",
        "Scope 5 is self-hosted IaaS.",
        "Scope 2 is enterprise SaaS with commercial contracts."
      ],
      "examTrap": "Unapproved public consumer AI chat = Scope 1 (highest risk of data exfiltration).",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "responsibility",
      "source": "https://aws.amazon.com/compliance/shared-responsibility-model/"
    },
    {
      "id": "e3_q58",
      "examId": 3,
      "questionNumber": 58,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "Bedrock data residency and inference routing",
      "type": "single",
      "scenario": "A company requires AI processing to remain within approved locations. It is considering a cross-Region inference profile.",
      "question": "What should the team verify before using that profile?",
      "options": [
        "The profile’s possible destination Regions and the organization’s residency requirements",
        "Only the Region in the URL of the initial request",
        "That the application uses a longer system prompt",
        "That CloudWatch dashboards have been disabled"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Cross-Region inference can route processing to other Regions supported by the chosen profile. Verify the destination geography, model and feature policies, and organizational restrictions. Do not assume all processing stays in the source Region.",
      "distractors": [
        "Destination Regions determine whether routing fits the residency requirement.",
        "The initial endpoint alone does not describe all possible processing locations.",
        "Prompt length does not constrain routing.",
        "Disabling monitoring does not enforce residency."
      ],
      "examTrap": "Review routing and data-use policy separately.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "privacy",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
    },
    {
      "id": "e3_q59",
      "examId": 3,
      "questionNumber": 59,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "Amazon Macie - Automated PII Discovery",
      "type": "single",
      "scenario": "A healthcare company uploads 5 million unclassified patient PDF forms to an Amazon S3 bucket. Before using the data in Bedrock Knowledge Bases, the security team needs to discover whether any unencrypted medical records contain Social Security Numbers.",
      "question": "Which AWS security service continuously discovers and flags sensitive PII in Amazon S3?",
      "options": [
        "Amazon Macie",
        "AWS Shield",
        "AWS WAF",
        "Amazon CloudFront"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Amazon Macie is a fully managed data security service that uses machine learning and pattern matching to discover, classify, and protect sensitive data (PII, PHI, financial records) in Amazon S3.",
      "distractors": [
        "Amazon Macie scans S3 to discover and classify sensitive data and PII.",
        "Shield defends against DDoS attacks.",
        "WAF filters web traffic against application exploits.",
        "CloudFront is a content delivery network."
      ],
      "examTrap": "Discovering and classifying sensitive PII data in S3 = Amazon Macie.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "macie_console",
      "lessonId": "macie",
      "source": "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"
    },
    {
      "id": "e3_q60",
      "examId": 3,
      "questionNumber": 60,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "AWS KMS - Key Policies and Access Control",
      "type": "single",
      "scenario": "An enterprise encrypts its Amazon Bedrock Knowledge Base vector database in OpenSearch Serverless using an AWS KMS Customer Managed Key (CMK). A junior admin is able to read the OpenSearch index but cannot decrypt the data.",
      "question": "Where must permissions be granted to allow decryption of KMS-encrypted resources?",
      "options": [
        "In the AWS KMS Key Policy governing the CMK",
        "In the S3 Bucket Lifecycle rule",
        "In the Route 53 DNS record",
        "In the Amazon Polly lexicon"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "AWS KMS Customer Managed Keys (CMKs) are controlled by KMS Key Policies. Access to perform cryptographic operations (like `kms:Decrypt`) requires explicit permission in the Key Policy, in addition to IAM identity permissions.",
      "distractors": [
        "KMS Key Policies govern which IAM principals can perform encryption and decryption.",
        "Lifecycle rules manage object tiering and expiration.",
        "DNS records resolve hostnames.",
        "Polly lexicons control speech pronunciation."
      ],
      "examTrap": "KMS permissions require granting `kms:Decrypt` in the KMS Key Policy.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "encryption",
      "source": "https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"
    },
    {
      "id": "e3_q61",
      "examId": 3,
      "questionNumber": 61,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "AWS CloudTrail - Auditing Bedrock API Invocations",
      "type": "single",
      "scenario": "During a compliance investigation, a forensic security officer needs to determine which IAM user invoked the Anthropic Claude 3 model on Amazon Bedrock on August 14th at 14:22 UTC.",
      "question": "Which AWS service stores and provides search over these API invocation events?",
      "options": [
        "AWS CloudTrail Event History",
        "Amazon S3 Glacier",
        "Amazon DynamoDB Streams",
        "AWS Trusted Advisor"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "AWS CloudTrail records AWS account activity and API calls (including `InvokeModel` and `InvokeModelWithResponseStream` for Amazon Bedrock). The Event History allows searching by event name, user identity, and timestamp.",
      "distractors": [
        "AWS CloudTrail logs identity, timestamp, and parameters for all Bedrock API calls.",
        "Glacier is archival storage, not an event audit search engine.",
        "DynamoDB Streams records table row modifications.",
        "Trusted Advisor checks high-level best practices."
      ],
      "examTrap": "Auditing 'Who made what API call to Bedrock and when' = AWS CloudTrail.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "audit",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
    },
    {
      "id": "e3_q62",
      "examId": 3,
      "questionNumber": 62,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "IAM Condition Keys for Model Governance",
      "type": "single",
      "scenario": "A security administrator wants an IAM policy that allows developers to invoke Bedrock models ONLY if the request originates from within the corporate corporate network IP range `198.51.100.0/24`.",
      "question": "Which element of an IAM policy statement enforces this constraint?",
      "options": [
        "The `Condition` block using `aws:SourceIp`",
        "The `Principal` element",
        "The `Action` list",
        "The `Resource` ARN"
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "The `Condition` block in an IAM policy statement specifies conditions for when the policy is in effect. Using the `aws:SourceIp` condition key restricts API execution to requests originating from authorized IP CIDR blocks.",
      "distractors": [
        "IAM Condition block with `aws:SourceIp` restricts access by client IP range.",
        "Principal specifies WHO the policy applies to.",
        "Action lists permitted API operations (e.g. `bedrock:InvokeModel`).",
        "Resource specifies WHICH target ARN can be accessed."
      ],
      "examTrap": "Restricting AWS API calls by IP range or tag = IAM Condition block.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "iam",
      "source": "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
    },
    {
      "id": "e3_q63",
      "examId": 3,
      "questionNumber": 63,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "VPC Interface Endpoints vs NAT Gateway for Bedrock",
      "type": "single",
      "scenario": "An enterprise policy mandates that backend Lambda functions invoking Amazon Bedrock must not use a NAT Gateway or Internet Gateway to access Bedrock services.",
      "question": "How should the network engineer connect the private VPC subnets to Amazon Bedrock?",
      "options": [
        "Create a VPC Interface Endpoint (powered by AWS PrivateLink) for Amazon Bedrock.",
        "Assign public IP addresses to all Lambda functions.",
        "Route traffic through an open Amazon EC2 proxy instance.",
        "Disable SSL/TLS encryption."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "VPC Interface Endpoints (powered by AWS PrivateLink) provide private, direct connectivity to Amazon Bedrock from within private subnets without traversing the public internet or requiring NAT Gateways or Internet Gateways.",
      "distractors": [
        "Interface Endpoints route traffic securely within the AWS network without internet gateways.",
        "Public IPs expose instances to the public internet.",
        "EC2 proxies traverse the internet if not using private endpoints.",
        "Disabling TLS destroys data-in-transit security."
      ],
      "examTrap": "Connecting private subnets to Bedrock without NAT or Internet Gateway = VPC Interface Endpoint (AWS PrivateLink).",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_kb_console",
      "lessonId": "network",
      "source": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
    },
    {
      "id": "e3_q64",
      "examId": 3,
      "questionNumber": 64,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "AWS Shared Responsibility - SaaS vs IaaS",
      "type": "single",
      "scenario": "A company is choosing between building a custom chatbot on Amazon EC2 (IaaS) versus using Amazon Q Business (SaaS).",
      "question": "How does the customer's operational security responsibility compare between these two options?",
      "options": [
        "Amazon Q Business reduces customer responsibility to managing access permissions and content, while EC2 requires managing OS patches, runtimes, and security groups.",
        "Amazon Q Business requires managing physical data center hardware, while EC2 does not.",
        "Both options have identical shared responsibility requirements.",
        "The customer has zero security responsibilities in both models."
      ],
      "correctAnswers": [
        0
      ],
      "explanation": "Under SaaS (Amazon Q Business), AWS manages the infrastructure, operating systems, software patching, and model maintenance; the customer only manages user access (IAM) and data. Under IaaS (Amazon EC2), the customer is responsible for guest OS patching, networking, and runtime security.",
      "distractors": [
        "SaaS offloads OS and runtime management to AWS; IaaS leaves them with the customer.",
        "AWS always manages physical hardware in both models.",
        "Responsibility varies significantly across cloud service types.",
        "The customer always manages access and data security in the cloud."
      ],
      "examTrap": "SaaS = Lowest customer infrastructure responsibility. IaaS = Highest customer responsibility.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "q_business_console",
      "lessonId": "responsibility",
      "source": "https://aws.amazon.com/compliance/shared-responsibility-model/"
    },
    {
      "id": "e3_q65",
      "examId": 3,
      "questionNumber": 65,
      "domain": 5,
      "domainTitle": "Domain 5: Security, Compliance, and Governance for AI Solutions",
      "subtopic": "Multi-Response (Security & Compliance)",
      "type": "multiple",
      "scenario": "A financial enterprise is deploying Amazon Bedrock for wealth advisors. To satisfy strict SEC compliance rules, the architecture must guarantee that customer data is protected at rest, and that all API interactions are logged.",
      "question": "Which TWO AWS configurations should be implemented? (Select TWO)",
      "options": [
        "Encrypt data stored in Amazon S3 and vector databases using AWS KMS Customer Managed Keys (CMKs).",
        "Enable AWS CloudTrail with data event logging enabled for Amazon Bedrock API calls.",
        "Disable Amazon Bedrock Guardrails to prevent query delays.",
        "Make S3 buckets publicly readable to simplify vector indexing.",
        "Store database passwords in cleartext in application code."
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": "To meet financial regulatory compliance (SEC/FINRA), organizations must: 1) Encrypt all data at rest using customer-controlled cryptographic keys (AWS KMS CMKs), and 2) Enable AWS CloudTrail with data event logging to create a tamper-proof audit trail of all model invocations.",
      "distractors": [
        "KMS CMKs provide customer-controlled encryption at rest for S3 and vector databases.",
        "CloudTrail data event logging records individual `InvokeModel` API calls for auditability.",
        "Disabling guardrails removes essential safety and compliance protections.",
        "Public buckets expose proprietary data to the world.",
        "Storing cleartext passwords is a severe security vulnerability."
      ],
      "examTrap": "Enterprise compliance on AWS requires KMS encryption at rest + CloudTrail audit logging.",
      "diagramKey": "security_scoping",
      "consoleViewKey": "bedrock_guardrails_console",
      "lessonId": "responsibility",
      "source": "https://aws.amazon.com/compliance/shared-responsibility-model/"
    }
  ]
};
