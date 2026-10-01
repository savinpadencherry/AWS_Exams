/* Domain 1 questions: Task 1.3 (data pipelines) and Task 1.4 (vector stores). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d1-029", d: 1, t: "1.3", s: "1.3.1", type: "single",
  sc: "A pipeline ingests product catalog data into a knowledge base for a shopping assistant. Occasionally, records with missing descriptions or out-of-range prices are ingested, causing poor answers. The team wants automated quality rules that block bad batches and alert operators.",
  q: "Which solution is MOST appropriate?",
  o: [
    "Define AWS Glue Data Quality completeness and range rules in the ETL job, publish pass/fail results to CloudWatch, and alarm on failures",
    "Add an instruction to the assistant's system prompt telling the model to ignore records with missing descriptions or odd prices at query time",
    "Increase the number of retrieved chunks per query so that good records outnumber the bad ones in the model's context window",
    "Delete and re-create the knowledge base every night from the latest source export so that bad records never persist for long"],
  a: [0],
  e: "**Glue Data Quality** evaluates rules such as completeness and ranges (DQDL) inside the pipeline. Publishing results to **CloudWatch** lets you stop bad data early and alert operators.",
  w: [
    "Rules at ingestion stop bad data before it can harm retrieval, with monitoring and alerts.",
    "Pushing data quality problems to inference time is unreliable and costly, and bad records are still indexed.",
    "More chunks adds noise and cost and does not remove the bad records.",
    "Re-creating the base re-ingests the same bad data and does not validate it."]
},

{
  id: "d1-030", d: 1, t: "1.3", s: "1.3.1", type: "single",
  sc: "Documents uploaded to Amazon S3 must be rejected before embedding if they are empty, exceed 20 MB, are not in an allowed language, or contain unsupported file types. The checks are custom and must run within seconds of upload.",
  q: "Which approach is MOST suitable?",
  o: [
    "Run a weekly Amazon EMR job that scans the whole bucket and produces a report of invalid files for the team to review",
    "Trigger an AWS Lambda function from the S3 event to run the custom checks, move invalid files to a quarantine prefix, and emit CloudWatch metrics",
    "Have the team review each upload manually in the console before it is added to the knowledge base data source",
    "Ingest every file and rely on the embedding model or ingestion job to fail on files that are empty, oversized or unsupported"],
  a: [1],
  e: "Event-driven **Lambda validation** gives immediate, custom checks. Invalid items move to quarantine and metrics provide visibility.",
  w: [
    "Weekly batch scans are far too slow for a seconds-level requirement.",
    "Immediate, automated and observable validation with a safe place for invalid files.",
    "Manual review does not scale and cannot meet a seconds-level requirement.",
    "Failures at embedding time waste compute, and some bad files would silently produce poor vectors."]
},

{
  id: "d1-031", d: 1, t: "1.3", s: "1.3.2", type: "single",
  sc: "A call center stores thousands of recorded customer calls in Amazon S3. Management wants searchable summaries of each call that identify the customer's main issue.",
  q: "Which pipeline is MOST appropriate?",
  o: [
    "Send the raw audio files directly to a text-only foundation model through InvokeModel and ask for a summary of each call",
    "Run Amazon Rekognition on each recording to detect the main topics and then store the labels as the summary of the call",
    "Convert each call to text with Amazon Transcribe (speaker labels enabled), then send the transcript to a Bedrock model with a summarization prompt",
    "Use Amazon Textract to read the recordings and pass the extracted text to a Bedrock model for summarization"],
  a: [2],
  e: "Text-only models cannot consume raw audio. **Transcribe** produces transcripts with speaker identification, which the FM then summarises.",
  w: [
    "A text-only model cannot process raw audio files.",
    "Rekognition analyzes images and video, not speech.",
    "Speech-to-text first, then summarization: each service is used for what it is built for.",
    "Textract extracts text from documents and images, not audio."]
},

{
  id: "d1-032", d: 1, t: "1.3", s: "1.3.2", type: "single",
  sc: "A company must extract fields from thousands of scanned invoices and also transform large CSV exports before a model sees them. Invoice layouts vary.",
  q: "Which combination is MOST appropriate?",
  o: [
    "Amazon Textract (or Bedrock Data Automation) for invoice extraction and SageMaker Processing or AWS Glue for the large CSV transformation",
    "Amazon Transcribe for the invoices and Amazon Lex to transform the large CSV exports into a clean text format",
    "Amazon Polly to read the scanned invoices and Amazon Kinesis to transform the large CSV exports into model-ready text",
    "Amazon Comprehend for both tasks: reading the scanned invoice images and transforming the large CSV exports"],
  a: [0],
  e: "Use **purpose-built services**: Textract (or BDA) for document extraction, and a batch processing service for heavy tabular transforms.",
  w: [
    "Each task uses the service built for it.",
    "Transcribe handles audio and Lex builds conversational bots; neither suits invoices or CSV transforms.",
    "Polly converts text to speech and Kinesis streams data; neither extracts invoice fields.",
    "Comprehend analyzes text; it does not read scanned images or perform large dataset transformations."]
},

{
  id: "d1-033", d: 1, t: "1.3", s: "1.3.2", type: "single",
  sc: "A manufacturing company receives mixed content from field engineers: photos of equipment, PDF manuals and short voice notes. It needs one workflow that converts these into structured JSON for downstream systems with minimal custom code.",
  q: "Which service is designed for this need?",
  o: [
    "Amazon Bedrock Data Automation",
    "Amazon SageMaker Neo, compiling an open model that reads each file type",
    "AWS Step Functions Express Workflows with a Lambda function that guesses each file's content",
    "Amazon Connect with a contact flow that routes each file type to a different team"],
  a: [0],
  e: "**Bedrock Data Automation** extracts structured output from documents, images, audio and video using blueprints, so downstream systems get consistent JSON.",
  w: [
    "Purpose-built for converting documents, images, audio and video into structured output.",
    "Neo compiles models for hardware optimization; it does not extract content.",
    "Step Functions orchestrates steps but does not understand content by itself.",
    "Connect is a contact center service, not a content extraction service."]
},

{
  id: "d1-034", d: 1, t: "1.3", s: "1.3.3", type: "single",
  sc: "A developer migrates a working application from one model provider's model to another on Amazon Bedrock by changing only the modelId in an InvokeModel call. Requests now fail with a ValidationException.",
  q: "What is the MOST likely cause and best long-term fix?",
  o: [
    "The model is being throttled; add retries with exponential backoff and wait for capacity to become available",
    "The request body uses the previous provider's JSON schema, and InvokeModel bodies are model-specific; adopt the Converse API",
    "The IAM role lacks permission for the new model; attach AdministratorAccess to the role so that every call succeeds",
    "Temperature must be set to zero for all models to accept requests, so set it explicitly in the request"],
  a: [1],
  e: "**InvokeModel payloads are model-specific.** A ValidationException after a model swap usually means a field mismatch. The Converse API standardises messages, system prompts and inference parameters.",
  w: [
    "Throttling raises ThrottlingException, not a validation error.",
    "Wrong body format causes validation errors, and Converse avoids this class of bug across models.",
    "Missing permission produces AccessDeniedException, and administrator access violates least privilege.",
    "Temperature is unrelated to schema validation."]
},

{
  id: "d1-035", d: 1, t: "1.3", s: "1.3.3", type: "single",
  sc: "A multi-turn support chatbot calls Amazon Bedrock with the Converse API. After the second turn, the model ignores earlier context.",
  q: "What should the developer check FIRST?",
  o: [
    "Whether the full prior conversation is sent in the messages array, alternating user and assistant roles in order, with each request",
    "Whether the model needs to be fine-tuned on the company's chat transcripts so that it can retain conversation memory natively",
    "Whether Provisioned Throughput is enabled, since on-demand capacity does not retain earlier turns of a conversation",
    "Whether the Region has a cross-Region inference profile, since profiles preserve conversation state between Regions"],
  a: [0],
  e: "Foundation model APIs are **stateless**. The application must send the relevant conversation history (alternating `user`/`assistant` messages) on each call.",
  w: [
    "Foundation model APIs are stateless; history must be supplied by the application on each call.",
    "Tuning does not add memory to a stateless API.",
    "Capacity settings do not change how context is handled.",
    "Inference profiles route requests and do not preserve conversation state."]
},

{
  id: "d1-036", d: 1, t: "1.3", s: "1.3.3", type: "single",
  sc: "A team deploys an open-weight model on a SageMaker AI real-time endpoint using a large model inference container. Invocations return 400 errors even though the endpoint is healthy.",
  q: "Which is the MOST likely issue?",
  o: [
    "Amazon Bedrock Guardrails are blocking the requests, so the guardrail configuration should be reviewed and relaxed",
    "The request payload does not match the JSON format the serving container expects, for example the inputs and parameters fields",
    "The Lambda function that calls the endpoint has too small a timeout, so it should be increased to the maximum",
    "The embedding model dimension does not match the endpoint, so the vector size should be changed in the request"],
  a: [1],
  e: "SageMaker endpoints accept whatever format the **serving container** defines. A healthy endpoint returning 400 usually means a payload format mismatch.",
  w: [
    "Guardrails are not part of a direct SageMaker endpoint call.",
    "SageMaker endpoints accept whatever format the serving container defines, so a payload mismatch gives 400 errors.",
    "A Lambda timeout would produce timeouts, not a 400 response from the endpoint.",
    "Embedding dimensions are unrelated to a text-generation endpoint."]
},

{
  id: "d1-037", d: 1, t: "1.3", s: "1.3.4", type: "single",
  sc: "Customer feedback text contains inconsistent date formats, HTML fragments, repeated disclaimers and mixed units. The downstream FM extraction is inconsistent.",
  q: "Which step BEST improves FM response quality and consistency?",
  o: [
    "Normalize and clean the text in Lambda (strip markup and boilerplate, standardize dates and units) and optionally extract entities with Comprehend",
    "Send the raw text unchanged and raise the temperature so the model has more freedom to interpret the inconsistent formats",
    "Remove all numbers from the text before prompting so that unit and date inconsistencies cannot affect the extraction",
    "Increase maxTokens so that the model has room to explain every inconsistency it finds in its extraction output"],
  a: [0],
  e: "**Input normalization** is deterministic work best done in code (Lambda), with **Comprehend** extracting entities or key phrases. Cleaner input gives more consistent outputs.",
  w: [
    "Deterministic cleaning plus entity extraction directly addresses inconsistent inputs.",
    "Higher temperature increases variability instead of consistency.",
    "Numbers are often the key content; deleting them destroys information.",
    "maxTokens limits output length only and does not clean the input."]
},

{
  id: "d1-038", d: 1, t: "1.3", s: "1.3.4", type: "multiple",
  sc: "A company wants to improve the quality of messy user-submitted text before summarisation by a foundation model.",
  q: "Which TWO actions improve input quality?",
  o: [
    "Use Amazon Comprehend to detect the dominant language and extract key entities from each submission",
    "Use an AWS Lambda function to normalize whitespace, encodings and date formats before the text is summarized",
    "Double the temperature setting so the model is more tolerant of messy or ambiguous input text during summarization",
    "Disable all preprocessing so the original text is preserved exactly as users typed it",
    "Strip all punctuation from every document so that formatting differences cannot confuse the summarization model"],
  a: [0,1],
  e: "Language detection/entity extraction and deterministic normalization produce cleaner, more consistent input. Randomness settings do not improve input quality.",
  w: [
    "Comprehend adds structured signals for routing and prompting.",
    "Normalization removes avoidable noise.",
    "Temperature affects output variability only, not input quality.",
    "Skipping preprocessing leaves the noise problem unsolved.",
    "Punctuation carries meaning; removing it harms comprehension."]
},

{
  id: "d1-039", d: 1, t: "1.3", s: "1.3.1", type: "single",
  sc: "A data team wants to profile a tabular training dataset visually, detect missing values and outliers, and apply cleaning transformations without writing much code before preparing data for a model.",
  q: "Which service fits BEST?",
  o: [
    "Amazon SageMaker Data Wrangler",
    "Amazon Lex with a data-profiling intent configured for the training table",
    "AWS WAF with a managed rule group that inspects the dataset for outliers",
    "Amazon Route 53 Resolver query logs analyzed for missing values in the table"],
  a: [0],
  e: "**SageMaker Data Wrangler** provides visual data profiling and transformation for ML data preparation.",
  w: [
    "Visual data profiling and cleaning is Data Wrangler's purpose.",
    "Lex builds conversational bots, not data profiling tools.",
    "WAF filters web traffic.",
    "Route 53 Resolver logs record DNS queries, not dataset quality."]
},

{
  id: "d1-040", d: 1, t: "1.3", s: "1.3.2", type: "single",
  sc: "A pipeline processes hundreds of gigabytes of tabular logs into text summaries nightly before sending samples to a foundation model. The job needs a managed, scalable batch compute environment for the transformation step.",
  q: "Which choice is MOST appropriate for the transformation step?",
  o: [
    "An Amazon SageMaker Processing job that runs the transformation as managed, scalable batch compute",
    "A single AWS Lambda function with the maximum memory and timeout, processing all logs in one invocation",
    "An Amazon API Gateway REST API that receives each log file and transforms it in a mapping template",
    "An Amazon CloudFront distribution with a Lambda@Edge function that summarizes each log file"],
  a: [0],
  e: "**SageMaker Processing** runs managed batch jobs at scale for data transformation. A single Lambda is limited by memory and a 15-minute maximum.",
  w: [
    "Managed, scalable batch compute for large transformations.",
    "Lambda memory and its 15-minute limit make it unsuitable for hundreds of gigabytes in one invocation.",
    "API Gateway exposes APIs and cannot run a heavy batch transformation.",
    "CloudFront and Lambda@Edge are for content delivery at the edge."]
},

{
  id: "d1-041", d: 1, t: "1.3", s: "1.3.1", type: "multiple",
  sc: "A team designs automated validation of documents before they are used for retrieval augmentation.",
  q: "Which TWO validation workflow elements are appropriate?",
  o: [
    "Publish validation pass rates and rejected counts as CloudWatch metrics and alarm when they cross thresholds",
    "Route invalid documents to a quarantine location for review instead of ingesting them into the index",
    "Ingest everything into the vector store and let end users report any bad answers that they happen to notice",
    "Skip validation for documents from internal systems because internal data is already trusted and clean",
    "Validate the document collection once per year during the annual audit cycle"],
  a: [0,1],
  e: "Good workflows are **observable** (metrics and alarms) and **fail safe** (quarantine rather than ingest). Skipping validation or relying on users to find defects lets bad data into the index.",
  w: [
    "Metrics and alarms give operational visibility.",
    "Quarantine protects the index and enables review.",
    "User-found defects mean harm has already occurred.",
    "Internal sources also contain bad data.",
    "Annual validation is far too infrequent."]
},

{
  id: "d1-042", d: 1, t: "1.3", s: "1.3.4", type: "single",
  sc: "Support agents paste long, inconsistent notes into a tool. A model reliably extracts structured fields when the notes are tidy but not otherwise. The team wants a low-effort way to rewrite messy notes into a consistent form before extraction.",
  q: "What is the BEST approach?",
  o: [
    "Add a first step that asks a small Bedrock model to rewrite each note into a standard template, then run extraction on the cleaned text",
    "Train a new language model from scratch on the support team's historical notes so that it handles every style of note",
    "Ask the agents to write shorter notes and hope that shorter text will be structured enough for reliable extraction",
    "Keep the single extraction prompt as it is and increase top-k so the model considers more candidate tokens"],
  a: [0],
  e: "An FM is good at **reformatting free text**. A cheap rewriting step produces consistent input for the extraction step (prompt chaining).",
  w: [
    "Prompt chaining with a rewrite step is a quick, low-effort way to normalize input.",
    "Training from scratch is disproportionate for a formatting problem.",
    "Behavioral requests do not guarantee consistency.",
    "top-k changes sampling, not input quality."]
},

{
  id: "d1-043", d: 1, t: "1.3", s: "1.3.3", type: "single",
  sc: "A dialog application uses Amazon Bedrock. The developer wants consistent behavior defined once: assistant role and tone, plus the conversation turns.",
  q: "Where should the assistant role and tone instructions be placed in a Converse API request?",
  o: [
    "In the system parameter, separate from the user and assistant messages",
    "Inside every user message, repeated by the application each turn alongside the user's own text",
    "In the modelId string, appended to the identifier of the model being called",
    "In the Region name, since the Region determines the default assistant behavior of the model"],
  a: [0],
  e: "The Converse API has a dedicated **`system`** field for instructions such as role, tone and rules, separate from conversational `messages`.",
  w: [
    "The system field defines behavior consistently and is kept apart from user content.",
    "Repeating instructions in user messages is fragile and mixes untrusted input with instructions.",
    "The modelId selects a model and carries no instructions.",
    "The Region selects location only."]
},

{
  id: "d1-044", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A small team needs retrieval augmented generation over documents in Amazon S3 as quickly as possible and wants to avoid managing indexing infrastructure and chunk/embedding code.",
  q: "Which option provides the LEAST operational overhead?",
  o: [
    "Build a custom ingestion service on Amazon EC2 with a self-managed vector database and your own chunking and embedding code",
    "Create a Bedrock knowledge base with S3 as the data source and a managed vector store such as OpenSearch Serverless",
    "Store embeddings as files in Amazon S3 and scan them linearly at query time using a Lambda function",
    "Use Amazon DynamoDB as the vector index with a Lambda function computing cosine similarity across all items"],
  a: [1],
  e: "**Bedrock Knowledge Bases** automates parsing, chunking, embedding, storage and retrieval over an S3 source with a managed vector store.",
  w: [
    "Self-managing every component maximizes operational burden.",
    "A fully managed RAG pipeline with parsing, chunking, embedding, storage and retrieval.",
    "Linear scans do not scale and need custom code.",
    "DynamoDB is not a vector index, and scanning all items is slow and costly."]
},

{
  id: "d1-045", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A company stores customer records in Amazon Aurora PostgreSQL. It wants semantic search over product descriptions combined with relational filters and joins in one SQL query, and prefers to keep its data in one database.",
  q: "Which approach is BEST?",
  o: [
    "Export the data to Amazon DynamoDB and compute similarity in application code after fetching candidate items",
    "Enable the pgvector extension in Aurora PostgreSQL and store embeddings in a vector column with an HNSW index",
    "Query the product data with Amazon Athena only, using SQL string matching to approximate semantic similarity",
    "Store the embeddings in Amazon ElastiCache without any persistent copy and join with Aurora in application code"],
  a: [1],
  e: "**Aurora PostgreSQL with pgvector** supports vector similarity search alongside relational queries, filters and joins in the same database.",
  w: [
    "DynamoDB has no native vector similarity search, and the app would join data itself.",
    "Vectors, relational data and SQL in a single database satisfy every stated requirement.",
    "Athena queries files in S3 and is not designed for low-latency semantic search.",
    "A cache without durable records splits data across stores, contradicting \"one database\"."]
},

{
  id: "d1-046", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A pharma company wants to answer questions about relationships between drugs, targets and trials, such as \"which compounds interact with proteins linked to this condition\". Relationships across entities matter more than individual passages.",
  q: "Which retrieval store is MOST appropriate?",
  o: [
    "Amazon S3 Vectors only, with similar-passage retrieval over a very large embedding collection",
    "Amazon Neptune Analytics (graph plus vector) used for GraphRAG so retrieval can follow entity relationships",
    "Amazon ElastiCache with passages cached by key so that frequent questions are answered more quickly",
    "Amazon SQS queues holding one message per compound-target pair for the model to read in order"],
  a: [1],
  e: "**GraphRAG** uses a knowledge graph plus vectors so retrieval can follow relationships. Neptune Analytics supports this and integrates with Knowledge Bases.",
  w: [
    "Pure vector storage does not model entity relationships.",
    "Graph structure together with vector search captures relationships between entities.",
    "ElastiCache is a cache and does not capture relationships.",
    "SQS is a message queue, not a retrieval store."]
},

{
  id: "d1-047", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A research firm has hundreds of millions of embeddings from historical reports. Queries are infrequent, and the firm wants the lowest storage cost with acceptable latency while still integrating with Amazon Bedrock Knowledge Bases.",
  q: "Which vector store should the firm evaluate FIRST?",
  o: [
    "Amazon S3 Vectors",
    "A large always-on OpenSearch Service cluster with many replicas so that every query is served from memory",
    "A dedicated GPU instance that loads all vectors into memory to serve nearest-neighbor searches",
    "Amazon MemoryDB with the largest node type, holding every embedding in a multi-AZ in-memory index"],
  a: [0],
  e: "**S3 Vectors** is designed as a low-cost option for very large, less frequently queried vector sets, and integrates with Knowledge Bases.",
  w: [
    "Object-storage economics suit very large, infrequently queried collections and it integrates with Knowledge Bases.",
    "An always-on large cluster is costly for infrequent queries.",
    "Dedicated GPUs are expensive and unnecessary for this access pattern.",
    "Holding hundreds of millions of vectors in memory is the most expensive way to store them."]
},

{
  id: "d1-048", d: 1, t: "1.4", s: "1.4.2", type: "single",
  sc: "A knowledge base serves HR, finance and legal teams. Employees should retrieve only documents from their own department created in the last two years, and results should favor official policies.",
  q: "How should the developer achieve this retrieval precision?",
  o: [
    "Instruct the model in the system prompt to ignore documents from other departments and anything older than two years",
    "Attach metadata (department, document type, creation date) to documents and apply metadata filters at retrieval time",
    "Create a separate AWS account for each document and give departments access only to the accounts they own",
    "Lower the temperature to zero so that the model returns only the most relevant documents it has been shown"],
  a: [1],
  e: "**Metadata filtering** restricts which chunks can be retrieved, improving relevance and access control. The filter is enforced by the retrieval layer, not by the model.",
  w: [
    "Prompts cannot reliably enforce data boundaries, and the content has already been retrieved.",
    "Filtering by department, type and date narrows candidates before the model sees them.",
    "Absurdly heavy and not a retrieval design.",
    "Temperature does not affect which documents are retrieved."],
  trap: "Access and relevance filtering belongs in retrieval metadata, not in the prompt."
},

{
  id: "d1-049", d: 1, t: "1.4", s: "1.4.2", type: "single",
  sc: "Amazon S3 documents ingested into an Amazon Bedrock knowledge base need author, domain and publication-year attributes that can be used as retrieval filters.",
  q: "How can these attributes be supplied?",
  o: [
    "Add a companion metadata file (for example document.pdf.metadata.json) next to each source object containing the attributes",
    "Rename each file to include the author and year, then parse the file names at query time with a Lambda function",
    "Store the attributes only in the CloudWatch log group of the ingestion job and read them back at query time",
    "Put the attributes in the Lambda function name that performs the ingestion for each document"],
  a: [0],
  e: "Knowledge Bases reads **metadata files** stored alongside source objects in S3 and makes the attributes available for filtering.",
  w: [
    "Companion .metadata.json files are the supported mechanism for attaching filterable attributes.",
    "File-name parsing is brittle and is not how the knowledge base reads attributes.",
    "Logs are not used for retrieval filters.",
    "Function names are unrelated to document attributes."]
},

{
  id: "d1-050", d: 1, t: "1.4", s: "1.4.3", type: "single",
  sc: "An Amazon OpenSearch Service vector index has grown to billions of vectors. Query latency increases at peak, and a single large shard is a hotspot.",
  q: "Which change BEST improves performance at scale?",
  o: [
    "Re-index into a properly sharded index with more primary shards and add replicas to spread query load",
    "Reduce the index to a single shard so that every query touches only one partition",
    "Disable all replicas to save memory and give the primary shard more resources",
    "Switch to a smaller instance type to reduce per-node overhead for the index"],
  a: [0],
  e: "Proper **sharding** spreads data and compute across nodes, and **replicas** add read capacity and availability. Re-index when the shard count must change.",
  w: [
    "Distributes data and compute across nodes and adds read capacity.",
    "A single shard worsens the hotspot.",
    "Fewer replicas reduce query throughput and resilience.",
    "Smaller instances reduce capacity."]
},

{
  id: "d1-051", d: 1, t: "1.4", s: "1.4.3", type: "single",
  sc: "A company's documents cover legal, engineering and HR. Queries are specialized and one-index search returns mixed results and is slow. The company wants to narrow the search space.",
  q: "Which design is MOST appropriate?",
  o: [
    "Keep a single index with every domain mixed together and rely on a larger k value to find the right documents",
    "Use multi-index or hierarchical indexing: route a query to the relevant domain index (or a summary index pointing to detailed chunks) first",
    "Keep one index but store only one representative document per domain to reduce the number of vectors to search",
    "Store each domain's embeddings in separate Amazon SNS topics and subscribe the query service to the relevant topic"],
  a: [1],
  e: "**Multi-index and hierarchical indexing** narrow candidates by domain or by summary-to-detail routing, improving relevance and latency at scale.",
  w: [
    "Mixing without filters causes noisy results and higher latency; larger k adds more noise.",
    "Routing reduces the search space and improves both precision and latency.",
    "Dropping documents loses content.",
    "SNS is a pub/sub service, not a vector store."]
},

{
  id: "d1-052", d: 1, t: "1.4", s: "1.4.3", type: "single",
  sc: "An OpenSearch k-NN deployment holds 800 million 1,024-dimension vectors. Memory cost is the main concern, and a small recall reduction is acceptable.",
  q: "Which technique reduces memory most directly?",
  o: [
    "Apply vector quantization (scalar, binary or product) or disk-based vector search to shrink the memory footprint",
    "Double the replica count so that memory use is spread more evenly across the data nodes",
    "Increase the vector dimension to 4,096 so that each vector represents more information per entry",
    "Turn off the approximate nearest-neighbor algorithm and use exact search so that no index structure is held in memory"],
  a: [0],
  e: "**Quantization** compresses vectors to reduce memory use at the cost of some recall; disk-based vector search also lowers memory needs.",
  w: [
    "Compression directly reduces memory footprint with an acceptable recall loss.",
    "More replicas increase total memory use.",
    "More dimensions increases memory use.",
    "Exact search is slower and heavier at this scale."]
},

{
  id: "d1-053", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A team indexes documents in Amazon OpenSearch Service and wants queries sent as plain text to be embedded automatically with an Amazon Bedrock embedding model, without custom embedding code in the application.",
  q: "Which OpenSearch capability should they use?",
  o: [
    "The neural search plugin with an ML connector to the Bedrock embedding model, plus an ingest pipeline for indexing",
    "An S3 Lifecycle policy that transitions documents to a vectorized storage class at index time",
    "An IAM permission boundary attached to the OpenSearch domain role that enables text-to-vector conversion",
    "AWS WAF managed rules attached to the OpenSearch endpoint to convert query text into embeddings"],
  a: [0],
  e: "The **neural plugin** and **ML connectors** let OpenSearch call a remote embedding model during ingest and query, so applications send text and OpenSearch handles vectorization.",
  w: [
    "Connectors plus neural queries vectorize text automatically at index and query time.",
    "Lifecycle policies manage object retention, not embeddings.",
    "Permission boundaries limit IAM permissions and do not generate embeddings.",
    "WAF filters web requests and does not embed text."]
},

{
  id: "d1-054", d: 1, t: "1.4", s: "1.4.4", type: "single",
  sc: "A company wants its RAG application to retrieve content from Confluence and SharePoint without building custom crawlers, and to keep the content synchronised.",
  q: "What is the MOST efficient solution?",
  o: [
    "Use Bedrock Knowledge Bases data source connectors for Confluence and SharePoint, with scheduled or on-demand sync",
    "Copy the pages manually every week to an S3 bucket and then run a sync on that bucket",
    "Ask users to paste the content of the relevant pages into their prompts when they ask questions",
    "Use Amazon Transcribe to capture the pages and convert them into text for the knowledge base"],
  a: [0],
  e: "Knowledge Bases provides **native connectors** (S3, web, Confluence, SharePoint, Salesforce) with sync jobs, avoiding custom crawler development.",
  w: [
    "Native connectors with sync jobs avoid custom crawler development.",
    "Manual copying is slow and error-prone, and content goes stale between copies.",
    "Pasting content defeats automation and does not scale.",
    "Transcribe converts speech to text, not wiki pages."]
},

{
  id: "d1-055", d: 1, t: "1.4", s: "1.4.4", type: "single",
  sc: "A company's internal wiki is not supported by a native Knowledge Bases connector. Content changes arrive from the wiki system through webhooks. The team wants new and updated pages searchable within minutes.",
  q: "Which design is MOST appropriate?",
  o: [
    "A Lambda function triggered by the webhook that fetches the page and submits it using the knowledge base direct document ingestion API",
    "Rebuild the entire knowledge base nightly by hand so that all wiki changes are captured in the index",
    "Remove the wiki from search until a native connector is available from the service",
    "Switch to a larger embedding model so that changed pages are represented more precisely in the index"],
  a: [0],
  e: "For custom sources, an **event-driven Lambda** can push changes via the Knowledge Bases **direct ingestion API** (custom data source), giving near-real-time updates without full re-syncs.",
  w: [
    "Webhook-driven incremental ingestion meets the minutes-level freshness target.",
    "Nightly manual rebuilds are slow and operationally heavy.",
    "Drops a required data source.",
    "Embedding size does not provide freshness."]
},

{
  id: "d1-056", d: 1, t: "1.4", s: "1.4.5", type: "single",
  sc: "Documents in an S3 bucket change throughout the day, and some are deleted. A Bedrock knowledge base occasionally returns answers based on documents that no longer exist.",
  q: "Which approach BEST keeps the vector store current?",
  o: [
    "Use S3 event notifications (through EventBridge or Lambda) to start incremental ingestion jobs, and sync the data source so deletions are reflected",
    "Never sync after the initial load, because the vector store keeps a permanent and accurate copy of the original documents",
    "Increase the model temperature so that answers based on missing documents become less likely to be repeated",
    "Delete the vector store monthly and rebuild it, accepting that answers may be stale in between rebuilds"],
  a: [0],
  e: "Use **change detection** to trigger **incremental synchronisation**, which ingests changes and removes content that is no longer in the source.",
  w: [
    "Event-driven incremental sync keeps vectors aligned with the source, including deletions.",
    "Without sync the index goes stale and deleted documents persist.",
    "Temperature has no effect on index freshness.",
    "A monthly rebuild leaves long windows of stale answers."]
},

{
  id: "d1-057", d: 1, t: "1.4", s: "1.4.5", type: "multiple",
  sc: "A team wants to design maintenance for the vector store behind a RAG assistant so that retrieved information is current and accurate.",
  q: "Which TWO mechanisms are appropriate?",
  o: [
    "An Amazon EventBridge schedule that starts knowledge base ingestion jobs for a periodic refresh",
    "S3 or database change events that trigger incremental updates for modified items",
    "A one-time load of all documents followed by no further updates, to keep the index stable",
    "Emailing updated documents to the model team so that they are added to the prompt by hand",
    "Increasing the embedding dimension every week so that newer content is represented more precisely"],
  a: [0,1],
  e: "Combine **scheduled refresh** (safety net) with **change-driven incremental updates** (freshness). Both keep the vector store aligned with source systems.",
  w: [
    "Scheduled refresh guarantees eventual consistency.",
    "Change events provide near-real-time freshness.",
    "A one-time load goes stale.",
    "Emailing documents is not an ingestion mechanism.",
    "Changing dimensions requires re-embedding everything and adds no freshness."]
},

{
  id: "d1-058", d: 1, t: "1.4", s: "1.4.1", type: "single",
  sc: "A chat application stores per-user conversation history, user preferences and document ownership data. A separate vector index holds document embeddings. The team needs a fast, scalable store for the history and metadata with automatic expiry of old sessions.",
  q: "Which service is MOST appropriate for the history and metadata?",
  o: [
    "Amazon DynamoDB with a TTL attribute for automatic session expiry",
    "Amazon S3 Glacier Deep Archive, with objects keyed by session ID and restored on each user request",
    "AWS CloudTrail, queried for the most recent events of each user on every request",
    "Amazon Rekognition collections storing a record of each user's conversation as searchable metadata"],
  a: [0],
  e: "**DynamoDB** provides low-latency key-value access and **TTL** for automatic expiry. It complements, rather than replaces, a vector index.",
  w: [
    "Fast, scalable key-value access with TTL expiry.",
    "Deep Archive has retrieval delays of hours, so it cannot serve live conversations.",
    "CloudTrail records API activity and is not an application data store.",
    "Rekognition analyzes images and video."]
},

{
  id: "d1-059", d: 1, t: "1.4", s: "1.4.3", type: "single",
  sc: "An engineering team must choose an approximate nearest-neighbor algorithm for an OpenSearch index. Their priorities are very low query latency and high recall, with memory available.",
  q: "Which algorithm is MOST appropriate?",
  o: [
    "HNSW (hierarchical navigable small world graph)",
    "Brute-force exact comparison against every vector for each query to guarantee perfect recall",
    "Sorting the documents alphabetically so that similar titles are retrieved together",
    "Hashing every vector into a single bucket and returning the bucket contents for each query"],
  a: [0],
  e: "**HNSW** gives fast, high-recall ANN search at the cost of more memory. IVF-style methods trade some recall for lower memory.",
  w: [
    "HNSW is the standard choice for low latency with high recall when memory is available.",
    "Exact scans are too slow at large scale.",
    "Alphabetical order has no relation to vector similarity.",
    "A single bucket destroys discrimination between vectors."]
}
);
