/* Domain 1 questions: Task 1.5 (retrieval mechanisms) and Task 1.6 (prompt engineering and governance). */
(window.QBANK = window.QBANK || []).push(
{
  id: "d1-060", d: 1, t: "1.5", s: "1.5.1", type: "single",
  sc: "A company indexes 400-page engineering manuals with numbered sections. Users ask detailed questions, but retrieved passages are accurate yet lack the surrounding section context, so the model answers incompletely.",
  q: "Which chunking strategy should the developer choose in Amazon Bedrock Knowledge Bases?",
  o: [
    "Hierarchical chunking, matching small child chunks for precision and returning the larger parent chunk for context",
    "Fixed-size chunking of 100 tokens with a 5% overlap, so that every passage is short enough to match a query precisely",
    "Semantic chunking with a high breakpoint threshold, so that each manual becomes a handful of very large chunks",
    "No chunking, embedding each manual as a single vector so that all sections are represented in the index"],
  a: [0],
  e: "**Hierarchical chunking** searches over small child chunks (precise matching) but returns the larger **parent** chunk, supplying surrounding context to the model.",
  w: [
    "Combines precise matching on small chunks with richer surrounding context returned to the model.",
    "Small flat chunks keep the same lack of surrounding context that causes the problem.",
    "Very large chunks dilute relevance and waste tokens, and do not solve the incomplete-answer problem reliably.",
    "One vector per 400-page manual dilutes meaning and cannot return focused passages."]
},

{
  id: "d1-061", d: 1, t: "1.5", s: "1.5.1", type: "single",
  sc: "A FAQ dataset contains short, self-contained question-answer pairs, each under 150 tokens. The team is adding the data to a knowledge base.",
  q: "Which chunking configuration is MOST appropriate?",
  o: [
    "Hierarchical chunking with very large parent chunks so that each FAQ is returned together with related FAQs",
    "No chunking (one chunk per entry), since each item is already a complete, small and self-contained unit",
    "Fixed-size chunks of 2,000 tokens so that many FAQs share a chunk and retrieval returns more context",
    "Semantic chunking with the largest buffer, so that the splitter groups related FAQs into larger chunks"],
  a: [1],
  e: "When content is already **small, self-contained units**, further splitting adds cost and can harm coherence. Using each entry as its own chunk preserves meaning.",
  w: [
    "Large parents would pull in unrelated FAQs and add token cost.",
    "Entries are already well-sized units, so extra splitting only adds cost and can harm coherence.",
    "2,000-token chunks would merge many unrelated FAQs together and hurt precision.",
    "Semantic splitting adds compute and groups items that were deliberately separate."]
},

{
  id: "d1-062", d: 1, t: "1.5", s: "1.5.1", type: "single",
  sc: "A company's documents are structured with headings, tables and code blocks. The default chunking splits tables in half. The team wants chunk boundaries that follow the document's structure.",
  q: "Which approach provides this capability?",
  o: [
    "Lower the temperature of the model so that responses stay consistent even when the retrieved chunks contain split tables",
    "Use a custom transformation (Lambda) in the ingestion flow that chunks by headings and keeps tables intact",
    "Increase the embedding dimensions so that the half-tables are represented with more precision in the vector index",
    "Disable the knowledge base for these documents and let the model answer from its own training data"],
  a: [1],
  e: "A **custom chunking transformation** (Lambda) lets you implement structure-aware logic such as splitting by heading and preserving tables.",
  w: [
    "Temperature is an inference parameter and does not change chunk boundaries.",
    "Custom chunking logic is the way to respect document structure.",
    "Dimensions change embedding detail, not chunk boundaries.",
    "Removes grounding and does not solve the problem."]
},

{
  id: "d1-063", d: 1, t: "1.5", s: "1.5.1", type: "multiple",
  sc: "A developer is tuning chunk size for a RAG application over long narrative reports.",
  q: "Which TWO statements about chunk sizing are correct?",
  o: [
    "Chunks that are too small can lose the context needed to answer a question",
    "Chunk overlap helps avoid cutting an idea in half at a chunk boundary",
    "Larger chunks always improve relevance because more text per chunk means more signal for the embedding model",
    "Chunk size has no measurable effect on retrieval quality as long as the embedding model is accurate",
    "Chunks should always be exactly one sentence long so that every vector captures a single clear idea"],
  a: [0,1],
  e: "Chunk size is a **trade-off**: too small loses context, too large dilutes relevance and wastes tokens. **Overlap** preserves continuity across boundaries.",
  w: [
    "Small chunks can fragment meaning.",
    "Overlap keeps ideas intact across boundaries.",
    "Large chunks dilute relevance and increase token cost.",
    "Chunking strongly affects retrieval quality.",
    "One-sentence chunks often lose the context needed to answer."]
},

{
  id: "d1-064", d: 1, t: "1.5", s: "1.5.2", type: "single",
  sc: "A team uses Amazon Titan Text Embeddings V2. Storage cost for hundreds of millions of vectors is high, and evaluations show that 512 dimensions give nearly the same retrieval quality as 1,024 on their data.",
  q: "What is the BEST action?",
  o: [
    "Use 512-dimension embeddings to cut storage and latency, re-embedding the corpus and queries consistently",
    "Keep 1,024 dimensions for all vectors, because a higher dimension count can never reduce retrieval quality",
    "Embed new queries with 512 dimensions and keep existing documents at 1,024 dimensions to avoid re-indexing",
    "Replace embeddings with keyword-only search to eliminate vector storage cost entirely"],
  a: [0],
  e: "Titan Text Embeddings V2 supports **256, 512 or 1,024** dimensions. Fewer dimensions reduce storage and speed up search; choose based on evaluation, and use the **same configuration** for documents and queries.",
  w: [
    "Evidence-based reduction cuts cost and latency with equal measured quality.",
    "Pays for unneeded storage when evaluation shows no benefit.",
    "Query and document vectors must have matching dimensions.",
    "Drops the semantic search capability the application relies on."]
},

{
  id: "d1-065", d: 1, t: "1.5", s: "1.5.2", type: "single",
  sc: "Retrieval quality dropped sharply after the team changed the embedding model for new documents only. Older documents were not re-embedded. Queries now use the new model.",
  q: "What is the MOST likely cause and fix?",
  o: [
    "Vectors from different embedding models share an index, so scores are not comparable; re-embed the entire corpus with the new model (or revert)",
    "The temperature of the generation model is set too low, so the answers are not exploring the relevant retrieved passages",
    "The generation model's context window is too small, so the best passages are cut off before the model reads them",
    "The IAM role for retrieval is missing a permission, so only part of the documents is returned for each query"],
  a: [0],
  e: "Embeddings from different models live in **different vector spaces**. Index and query must use the **same model** and configuration; re-embed everything after a change.",
  w: [
    "Embeddings from different models live in different vector spaces, so mixed indexes give meaningless similarity.",
    "Temperature does not affect which passages are retrieved.",
    "Context window concerns generation, not retrieval scoring.",
    "Missing permissions would cause errors, not degraded relevance."],
  trap: "Changing the embedding model means re-indexing everything."
},

{
  id: "d1-066", d: 1, t: "1.5", s: "1.5.2", type: "single",
  sc: "A global e-commerce company needs semantic search across product descriptions written in many languages, and has images it also wants to search with text queries.",
  q: "Which embedding choice is MOST appropriate to evaluate?",
  o: [
    "A multilingual text embedding model, plus a multimodal embedding model such as Titan Multimodal Embeddings for the image search use case",
    "An English-only embedding model for all text and images, translating nothing and relying on the model to cope",
    "Random vectors assigned to each item, tuned later by user click behavior to approximate similarity",
    "A text-generation foundation model asked to output a vector of numbers for each description and image"],
  a: [0],
  e: "Match embeddings to **language and modality**. Multilingual text embeddings serve cross-language search; multimodal embeddings place text and images in a shared space.",
  w: [
    "Fits both the language and the image requirements.",
    "English-only models perform poorly on other languages and cannot embed images.",
    "Random vectors carry no meaning.",
    "Generation models do not produce stable, comparable embeddings."]
},

{
  id: "d1-067", d: 1, t: "1.5", s: "1.5.2", type: "single",
  sc: "A company must generate embeddings for 50 million archived documents. There is no latency requirement, and cost and throughput matter.",
  q: "Which approach is MOST suitable?",
  o: [
    "Call the embedding model synchronously, one document at a time, from a single thread running on one instance",
    "Use parallel workers (Lambda or containers fed by SQS) or Bedrock batch inference, with throttling-aware retries",
    "Embed each document interactively the first time a user searches for it, caching the result afterwards",
    "Ask a chat model to approximate the embeddings for each archived document in a single long conversation"],
  a: [1],
  e: "Large offline embedding jobs should be **batched and parallelised** (queue-driven workers or Bedrock batch inference) with throttling-aware retries.",
  w: [
    "A single thread would take far too long for 50 million documents.",
    "Parallel, queue-driven or batch processing maximizes throughput and controls cost.",
    "On-demand embedding at search time makes first searches slow and unpredictable.",
    "Chat models do not produce stable, comparable embeddings."]
},

{
  id: "d1-068", d: 1, t: "1.5", s: "1.5.3", type: "single",
  sc: "A team already runs Amazon Aurora PostgreSQL and wants to add vector search for a moderate number of documents. They need to combine vector similarity with SQL filters and avoid adding another database.",
  q: "Which deployment is MOST appropriate?",
  o: [
    "Enable pgvector in Aurora PostgreSQL and use it as the vector store, optionally through Bedrock Knowledge Bases",
    "Add a new self-managed graph database cluster and replicate the relational data into it for vector search",
    "Store the vectors in Amazon CloudWatch Logs and query them with Logs Insights during retrieval",
    "Put the vectors in Amazon SQS FIFO queues and read them in order when a query arrives"],
  a: [0],
  e: "**pgvector on Aurora** keeps vectors and relational data together, supports SQL filters, and is supported as a Knowledge Bases vector store.",
  w: [
    "Reuses the existing database and supports SQL filters with vector similarity.",
    "A new self-managed system adds operations burden and splits data across stores.",
    "CloudWatch Logs is not a vector store.",
    "SQS is a messaging service, not a retrieval index."]
},

{
  id: "d1-069", d: 1, t: "1.5", s: "1.5.4", type: "single",
  sc: "Users search a support knowledge base for error codes such as \"ERR-4097-B\" and also ask natural-language questions. Pure vector search often misses exact error codes.",
  q: "Which search architecture BEST handles both?",
  o: [
    "Pure vector search using a higher-dimensional embedding model so that exact codes are represented precisely",
    "Hybrid search that combines keyword (lexical) matching and vector similarity",
    "Keyword-only search with synonym lists maintained by the support team for natural-language questions",
    "Random sampling of documents, ranked by the number of times each has been viewed previously"],
  a: [1],
  e: "**Hybrid search** combines lexical matching (good for exact tokens like codes and IDs) with semantic search (good for paraphrase and concepts).",
  w: [
    "Embeddings may blur exact identifiers regardless of dimension count.",
    "Covers both exact-term matching (codes) and semantic matching (natural language).",
    "Keyword-only search fails on paraphrased natural-language questions.",
    "Popularity-based sampling is not relevance retrieval."]
},

{
  id: "d1-070", d: 1, t: "1.5", s: "1.5.4", type: "single",
  sc: "In a RAG system, the correct passage is usually among the top 20 retrieved chunks but often ranked below position 5. The application sends only the top 5 chunks to the model, producing wrong answers.",
  q: "What should the developer add?",
  o: [
    "Add a reranker model (for example through Amazon Bedrock) that re-scores the top candidates before selecting the final chunks",
    "Raise the temperature of the generation model so that it can better infer the answer from lower-ranked passages",
    "Reduce the embedding dimension so that lower-ranked passages score closer to the top-ranked ones in the index",
    "Lengthen the system prompt with detailed rules about how to weigh the five chunks it receives"],
  a: [0],
  e: "A **reranker** applies a more precise cross-encoder scoring to the top-N candidates, moving the best passages to the top so fewer, better chunks go to the FM.",
  w: [
    "A reranker improves the ordering of candidates, directly addressing the symptom.",
    "Temperature influences generation randomness, not which passages are sent.",
    "Fewer dimensions could reduce retrieval accuracy.",
    "A longer system prompt does not change which chunks are retrieved."]
},

{
  id: "d1-071", d: 1, t: "1.5", s: "1.5.4", type: "multiple",
  sc: "A team wants to improve the relevance of retrieved passages for a legal research assistant.",
  q: "Which TWO changes are most likely to improve retrieval relevance?",
  o: [
    "Enable hybrid search (lexical plus vector)",
    "Add a reranker over the top candidate passages",
    "Increase the generation model temperature to 1.0 so that it is more open to lower-ranked passages",
    "Reduce the number of indexed documents to a random subset so that search has fewer candidates to rank",
    "Remove all metadata from the passages so that ranking depends only on text content"],
  a: [0,1],
  e: "Hybrid retrieval widens recall with both signals; reranking improves **precision** at the top. Temperature and randomly dropping data do not improve retrieval.",
  w: [
    "Adds exact-match capability to semantic search.",
    "Better ordering of the final candidates improves precision.",
    "Temperature affects generation, not retrieval.",
    "Dropping documents loses recall.",
    "Metadata supports filtering and precision; removing it reduces relevance control."]
},

{
  id: "d1-072", d: 1, t: "1.5", s: "1.5.5", type: "single",
  sc: "Users ask compound questions such as \"Compare the 2023 and 2024 refund policies and list what changed for enterprise customers.\" A single retrieval query returns passages about only one of the topics.",
  q: "Which technique BEST improves retrieval?",
  o: [
    "Query decomposition: split the question into focused sub-queries, retrieve for each, and combine the results",
    "Set the temperature to 0 so that the model always uses the first retrieved passage for both policy years",
    "Increase maxTokens so that the model can write a longer comparison from the one-sided passages it receives",
    "Cache the final answer for the compound question so that later users receive the same comparison"],
  a: [0],
  e: "**Query decomposition** (supported in Knowledge Bases or built with Lambda/Step Functions) retrieves for each sub-question so all required evidence is present.",
  w: [
    "Each sub-question gets targeted evidence.",
    "Temperature does not change what is retrieved.",
    "maxTokens limits output length and does not add missing evidence.",
    "Caching does not fix missing evidence for the first request."]
},

{
  id: "d1-073", d: 1, t: "1.5", s: "1.5.5", type: "single",
  sc: "In a chat interface, users ask follow-ups like \"What about for contractors?\" The retrieval step uses only that short message and returns irrelevant results.",
  q: "What should the developer implement?",
  o: [
    "Rewrite the follow-up into a standalone query using the conversation history (query transformation) before retrieval",
    "Increase the embedding dimensions so that short follow-up messages carry more information in the vector",
    "Turn off retrieval for follow-up questions and let the model answer from its context alone",
    "Use a shorter chunk size so that short follow-up questions match short passages more precisely"],
  a: [0],
  e: "**Query transformation** (contextualization) turns ambiguous follow-ups into self-contained queries so retrieval has enough signal.",
  w: [
    "Adds the missing context to the query so retrieval has enough signal.",
    "Dimensions do not supply missing context.",
    "Removing retrieval removes grounding.",
    "Chunk size does not fix an under-specified query."]
},

{
  id: "d1-074", d: 1, t: "1.5", s: "1.5.5", type: "single",
  sc: "Users search with very terse or jargon-heavy queries such as \"PTO carryover\". The relevant policy documents use different terminology (\"annual leave rollover\").",
  q: "Which technique BEST bridges the vocabulary gap?",
  o: [
    "Query expansion: have a foundation model add synonyms and related phrases before retrieval",
    "Truncate every query to its first word so that vocabulary differences are less likely to matter",
    "Remove the vector store and rely on exact keyword matching of the user's original phrase only",
    "Disable hybrid search so that only embeddings are used and exact vocabulary matters less"],
  a: [0],
  e: "**Query expansion** enriches terse queries with synonyms and related terms, improving recall when users and documents use different vocabulary.",
  w: [
    "Expansion adds alternate terminology so documents with different wording match.",
    "Truncation reduces signal and makes matching worse.",
    "Exact keyword matching would fail on different vocabulary.",
    "Hybrid search is not the issue, and the gap is vocabulary, which expansion addresses."]
},

{
  id: "d1-075", d: 1, t: "1.5", s: "1.5.6", type: "single",
  sc: "An agent built with the Converse API must decide when to search the company knowledge base. The team wants retrieval exposed in a consistent way so the model can call it as needed.",
  q: "Which design is MOST appropriate?",
  o: [
    "Define a search tool in the Converse toolConfig that the model can call, backed by the Knowledge Bases Retrieve API",
    "Hard-code retrieval of 50 chunks into every prompt, even for greetings and questions that do not need documents",
    "Ask the user to paste relevant documents into each message before the model answers",
    "Disable tool use and give the model a static summary of the knowledge base in its system prompt"],
  a: [0],
  e: "Exposing retrieval as a **tool (function calling)** lets the model decide when to retrieve and what to query, using a consistent API pattern.",
  w: [
    "Function calling gives dynamic, consistent retrieval access that the model invokes when needed.",
    "Always retrieving wastes tokens and adds noise.",
    "Manual pasting does not scale.",
    "A static summary cannot answer detailed questions and goes stale."]
},

{
  id: "d1-076", d: 1, t: "1.5", s: "1.5.6", type: "single",
  sc: "Several different agents, written in different frameworks, must all query the same vector search service using one standard interface, and new agents should be able to adopt it without custom integration code.",
  q: "Which approach BEST achieves this?",
  o: [
    "Wrap vector search in a Model Context Protocol (MCP) server and have each agent use an MCP client",
    "Copy the vector search code into every agent, adapting it to each framework's tool format",
    "Give each agent its own copy of the index so that queries never contend for shared resources",
    "Export search results to a shared mailbox that each agent reads from when it needs information"],
  a: [0],
  e: "**MCP** standardises how agents discover and call tools, so one server can be reused by any MCP-capable client without bespoke integration.",
  w: [
    "A single, standardized interface is reusable by any MCP-capable agent.",
    "Duplication creates drift and maintenance burden.",
    "Separate indexes multiply cost and inconsistency.",
    "Not a programmatic, standardized interface."]
},

{
  id: "d1-077", d: 1, t: "1.5", s: "1.5.3", type: "single",
  sc: "A team uses Amazon Bedrock Knowledge Bases and wants to retrieve passages only (no generation) to apply its own prompt and its own model call, keeping full control of the final prompt.",
  q: "Which API should they call?",
  o: [
    "Retrieve",
    "RetrieveAndGenerate",
    "ApplyGuardrail",
    "StartIngestionJob"],
  a: [0],
  e: "**Retrieve** returns the relevant chunks (and scores/metadata) so the application controls prompt assembly. `RetrieveAndGenerate` also calls an FM.",
  w: [
    "Returns the relevant chunks, scores and metadata so the application controls prompt assembly and the model call.",
    "Also calls a foundation model to generate an answer, which gives less control over the final prompt.",
    "ApplyGuardrail evaluates text against a guardrail and does not retrieve passages.",
    "StartIngestionJob syncs data sources; it does not query them."]
},

{
  id: "d1-078", d: 1, t: "1.5", s: "1.5.4", type: "single",
  sc: "A semantic-only search over medical text returns related but non-specific passages. The team wants to boost passages containing exact drug names while still using semantic similarity, with custom weighting between the two signals.",
  q: "Which capability helps MOST?",
  o: [
    "An OpenSearch Service hybrid query with a search pipeline that normalizes and weights lexical and vector scores",
    "A larger Lambda function with more memory so that ranking logic can combine the signals more quickly",
    "An S3 bucket policy that boosts access to the documents containing drug names for the search service",
    "AWS Secrets Manager rotation settings that update the ranking weights on a schedule"],
  a: [0],
  e: "OpenSearch **hybrid search** with a **normalization/weighting search pipeline** combines BM25 and k-NN scores with adjustable weights.",
  w: [
    "Direct control over blending lexical and semantic scores with adjustable weights.",
    "Lambda memory does not alter ranking logic.",
    "Bucket policies control access and do not influence ranking.",
    "Secrets Manager stores credentials."]
},

{
  id: "d1-079", d: 1, t: "1.5", s: "1.5.2", type: "multiple",
  sc: "A team is selecting an embedding configuration for a new retrieval application.",
  q: "Which TWO considerations are important?",
  o: [
    "Use the same embedding model and settings for indexing documents and for embedding queries",
    "Evaluate retrieval quality on domain-specific queries before choosing the embedding dimensionality",
    "Choose the model with the most marketing material, since vendors benchmark their best models most heavily",
    "Mix several unrelated embedding models in one index so that each document can use the model that suits it",
    "Never re-embed existing content after changing models, since old vectors remain compatible with new ones"],
  a: [0,1],
  e: "Consistency between index and query, and **measured** retrieval quality on your domain, drive embedding choices.",
  w: [
    "Required for meaningful similarity scores.",
    "Evidence-based selection balances cost and quality.",
    "Marketing volume is irrelevant to quality on your data.",
    "Mixed vector spaces break similarity.",
    "A model change requires re-embedding because vectors are not compatible."]
},

{
  id: "d1-080", d: 1, t: "1.5", s: "1.5.1", type: "single",
  sc: "A knowledge base ingests scanned PDFs containing tables and figures. Default text parsing produces garbled tables, harming answers.",
  q: "Which Knowledge Bases option should the developer use?",
  o: [
    "Configure an advanced parsing strategy that uses a foundation model (or Bedrock Data Automation) to parse complex documents",
    "Lower the temperature of the answer-generation model so that garbled table content is handled more carefully",
    "Disable chunking so that tables are never split, and keep each scanned PDF as a single chunk",
    "Reduce the number of retrieved results to one so that only the clearest garbled passage reaches the model"],
  a: [0],
  e: "Knowledge Bases offers **advanced parsing** using a foundation model or BDA to interpret tables, figures and complex layouts before chunking.",
  w: [
    "Better parsing fixes garbled content at the source, before chunking and embedding.",
    "Temperature does not affect ingestion quality.",
    "Chunking is separate from parsing, and one chunk per PDF would dilute relevance.",
    "Fewer results does not repair bad parsing."]
},

{
  id: "d1-081", d: 1, t: "1.5", s: "1.5.3", type: "single",
  sc: "A company needs advanced control of indexing, sharding and query scoring for a very large semantic search workload and has a platform team to operate the cluster. Hybrid search and custom ranking are required.",
  q: "Which vector search deployment fits BEST?",
  o: [
    "An Amazon OpenSearch Service domain with k-NN and hybrid search, operated by the platform team",
    "A single Amazon DynamoDB table with an embedding attribute and application-side similarity computation",
    "An Amazon SNS topic that fans queries out to document-specific subscribers for ranking",
    "AWS Direct Connect links that move the documents closer to the model for faster scoring"],
  a: [0],
  e: "**OpenSearch Service** offers the control (shards, k-NN settings, search pipelines, custom scoring) that this team wants and can operate.",
  w: [
    "Full control over indexing, sharding, k-NN settings, search pipelines and custom scoring.",
    "DynamoDB lacks native vector similarity search and custom ranking controls.",
    "SNS is messaging, not search.",
    "Direct Connect is network connectivity."]
},

{
  id: "d1-082", d: 1, t: "1.6", s: "1.6.1", type: "single",
  sc: "Ten applications use the same customer-service assistant prompt. Changes are made by editing strings in code, which causes inconsistent versions across applications and no review step.",
  q: "Which solution BEST addresses this?",
  o: [
    "Store the prompt as a parameterized template in Bedrock Prompt Management, create immutable versions, and reference it by ARN or version",
    "Email the latest prompt text to the application developers whenever it changes and ask them to update their code",
    "Keep a copy in each developer's personal notes so that each team can adjust it quickly for its own application",
    "Keep prompts hard-coded in each service so teams can move quickly without depending on a shared system"],
  a: [0],
  e: "**Prompt Management** centralises templates with variables, variants and **versions**, so every application uses the same reviewed prompt.",
  w: [
    "A central, versioned template removes inconsistency and adds a review step.",
    "Email distribution drifts and has no review control.",
    "Personal notes are not governed or versioned.",
    "Hard-coded copies are the root problem."]
},

{
  id: "d1-083", d: 1, t: "1.6", s: "1.6.1", type: "single",
  sc: "A company requires every model response to avoid investment advice and not reveal internal product codenames, even if the user asks directly or tries to trick the model.",
  q: "Which control should enforce this?",
  o: [
    "A detailed system prompt that says \"never give investment advice or reveal codenames\" and asks the model to refuse such requests",
    "Bedrock Guardrails with a denied topic for investment advice and word filters for codenames, applied to inputs and outputs",
    "Lowering the temperature to zero so that the model follows its instructions more consistently",
    "Increasing maxTokens so that the model has room to explain why it cannot answer such requests"],
  a: [1],
  e: "Prompts guide behavior but can be bypassed. **Guardrails** enforce policy outside the model on both inputs and outputs.",
  w: [
    "Instructions alone can be bypassed by a determined or tricky user.",
    "Denied topics and word filters enforce policy independently of the model.",
    "Temperature does not enforce content policy.",
    "maxTokens only limits output length."],
  trap: "Policy that must hold under adversarial input is enforced by Guardrails, not by the prompt."
},

{
  id: "d1-084", d: 1, t: "1.6", s: "1.6.2", type: "single",
  sc: "A travel chatbot needs to collect destination, dates and budget before searching. Users often give partial information. The workflow must ask follow-up questions and resume once everything is provided.",
  q: "Which implementation BEST supports this?",
  o: [
    "An AWS Step Functions workflow that checks for required fields, asks the user for what is missing, waits for the reply, then continues",
    "A single stateless prompt that asks the model to remember which fields have been collected across all messages",
    "An Amazon CloudFront distribution that caches partial answers so that users can resume their conversations",
    "AWS KMS keys that store the partially collected trip fields for each user between messages"],
  a: [0],
  e: "A **Step Functions** state machine can loop through clarification: validate, ask, wait (callback), and continue, keeping state across turns.",
  w: [
    "Explicit state and a clarification loop with a wait for the user's reply.",
    "A stateless prompt cannot reliably track required fields across turns.",
    "CloudFront delivers cached content and does not manage conversation state.",
    "KMS manages encryption keys, not application state."]
},

{
  id: "d1-085", d: 1, t: "1.6", s: "1.6.2", type: "single",
  sc: "A support assistant must route incoming messages to billing, technical or sales workflows based on the customer's intent, with minimal ML development.",
  q: "Which approach is MOST appropriate?",
  o: [
    "Classify intent with an FM prompt (or Comprehend custom classification) and route with a Step Functions Choice state",
    "Assign incoming messages to the workflows at random and let the agents transfer customers who are misrouted",
    "Use Amazon Polly to read each message and let the agent hear which team should answer it",
    "Ask customers to read the documentation and choose the correct support topic before they send a message"],
  a: [0],
  e: "**Intent classification** by prompt or Comprehend, then **content-based routing**, is a low-effort pattern.",
  w: [
    "Simple, low-effort intent routing.",
    "Random assignment ignores intent and creates rework.",
    "Polly converts text to speech and does not classify intent.",
    "Does not solve routing and hurts the customer experience."]
},

{
  id: "d1-086", d: 1, t: "1.6", s: "1.6.2", type: "single",
  sc: "A chatbot must remember the last 20 turns of each user conversation across Lambda invocations and delete idle sessions after 24 hours.",
  q: "Which design is MOST appropriate?",
  o: [
    "Store history in DynamoDB keyed by session ID with a 24-hour TTL, and load recent turns into each request",
    "Keep the history in Lambda local variables so that each invocation can read what was said before",
    "Store history on the client only and trust the client to send it back with each message",
    "Write the history to AWS CloudTrail and query it on each request for the last 20 turns"],
  a: [0],
  e: "**DynamoDB with TTL** provides durable, low-latency session storage and automatic expiry.",
  w: [
    "Durable, low-latency session storage with automatic cleanup.",
    "Lambda execution environments are ephemeral and not reliably shared across invocations.",
    "Client-held history can be tampered with.",
    "CloudTrail logs API activity and is not an application data store."]
},

{
  id: "d1-087", d: 1, t: "1.6", s: "1.6.3", type: "single",
  sc: "A regulated company needs prompt changes to be reviewed and approved before reaching production, and auditors want to know who changed which prompt and when.",
  q: "Which combination BEST meets the requirements?",
  o: [
    "Prompt Management versions promoted through an approval workflow, with AWS CloudTrail recording the API activity",
    "Developers edit production prompts directly in the console using a shared team login to move faster",
    "Prompts stored in an unversioned local file on a shared drive that anyone on the team can edit",
    "Email threads used as the system of record for who approved each prompt change and when"],
  a: [0],
  e: "**Versioned prompts plus an approval workflow** give controlled releases; **CloudTrail** provides the audit trail of who changed what and when.",
  w: [
    "Approvals plus auditable API logging satisfy both requirements.",
    "Shared credentials destroy accountability.",
    "No version history or audit trail.",
    "Email is not a controlled system of record."]
},

{
  id: "d1-088", d: 1, t: "1.6", s: "1.6.3", type: "multiple",
  sc: "A team wants prompt governance for a customer-facing application.",
  q: "Which TWO practices support governance?",
  o: [
    "Store prompt templates in version-controlled S3 or Prompt Management and separate dev, test and production",
    "Use CloudWatch Logs to record prompt usage for review",
    "Allow any developer to edit production prompts directly, so that fixes can be made without delay",
    "Delete older prompt versions immediately after a new version is created, to keep the repository tidy",
    "Embed API keys and secrets directly in the prompt text so that tools can authenticate when called"],
  a: [0,1],
  e: "Governance needs **versioning, environment separation and usage logging**. Open edit access, no history and embedded secrets undermine control and security.",
  w: [
    "Versioned, separated environments reduce risk.",
    "Usage logs support oversight and analysis.",
    "Open edit access is uncontrolled.",
    "History is needed for rollback and audit.",
    "Secrets in prompts leak into logs and responses."]
},

{
  id: "d1-089", d: 1, t: "1.6", s: "1.6.4", type: "single",
  sc: "A prompt update accidentally causes the model to stop returning valid JSON, and downstream systems fail. The team wants an automated check that verifies expected output structure before responses are used.",
  q: "Which solution is MOST appropriate?",
  o: [
    "An AWS Lambda function that validates each response against the expected JSON schema and records pass/fail metrics in CloudWatch",
    "Ask end users to report malformed outputs and fix the prompt after enough reports have accumulated",
    "Increase the model temperature so that the model produces more varied output that downstream systems can adapt to",
    "Remove the JSON requirement from the prompt and let the downstream systems parse free text"],
  a: [0],
  e: "**Automated output validation** in Lambda catches format regressions immediately; **CloudWatch metrics** reveal rising failure rates after a prompt change.",
  w: [
    "Deterministic validation with monitoring catches format regressions immediately.",
    "Relies on downstream failures to detect the problem.",
    "Higher temperature increases format variability.",
    "Removes the requirement instead of enforcing it."]
},

{
  id: "d1-090", d: 1, t: "1.6", s: "1.6.4", type: "single",
  sc: "Before promoting a new prompt version, a team wants to run it against 300 saved edge cases (empty input, extremely long input, multilingual text, adversarial text) and compare pass rates with the current version.",
  q: "Which approach is MOST suitable?",
  o: [
    "A Step Functions Map state that runs the edge cases through both versions, validates outputs in Lambda, and publishes pass-rate metrics",
    "Test five hand-picked examples manually in the console and promote the new version if the answers look reasonable to the author",
    "Deploy the new version straight to production and wait for customers to complain before deciding whether it should be reverted",
    "Compare the lengths of the two prompt texts and promote the shorter one to reduce token cost"],
  a: [0],
  e: "An automated, parallel **regression suite** compares prompt versions on a fixed edge-case set and exposes results as metrics.",
  w: [
    "Automated, parallel and measurable regression testing across prompt versions.",
    "Five manual samples miss most edge cases.",
    "Production users become the test suite.",
    "Prompt length says nothing about quality."]
},

{
  id: "d1-091", d: 1, t: "1.6", s: "1.6.5", type: "single",
  sc: "A prompt asks a model to solve multi-step shipping-cost problems, but answers are often wrong. The task requires several dependent calculations and comparisons.",
  q: "Which prompting technique is MOST likely to help?",
  o: [
    "Ask the model to reason step by step (chain-of-thought) with a worked example (few-shot) and a defined final-answer format",
    "Shorten the prompt to a single sentence with no instructions so that the model is not distracted by extra text",
    "Set the temperature to its maximum so that the model explores more reasoning paths on each attempt",
    "Remove all examples from the prompt so that the model is free to choose its own approach"],
  a: [0],
  e: "**Chain-of-thought** and **few-shot examples** improve multi-step reasoning, and an output format makes the final answer easy to extract.",
  w: [
    "Structured reasoning plus an example improves multi-step accuracy, and a format makes the answer easy to extract.",
    "Less guidance usually worsens multi-step reasoning.",
    "High temperature adds randomness and reduces reliability.",
    "Examples help models follow the pattern."]
},

{
  id: "d1-092", d: 1, t: "1.6", s: "1.6.5", type: "single",
  sc: "An application parses the model's response as JSON, but sometimes the model adds explanatory text around the JSON, breaking the parser.",
  q: "What is the MOST reliable improvement?",
  o: [
    "Define the output with a JSON schema through tool use or structured output (or explicit format instructions with an example) and validate the response",
    "Increase maxTokens so that the model has room to finish the JSON and then stop adding commentary on its own",
    "Raise the temperature so that the model tries different formats until one parses successfully",
    "Ask the model to be creative with its formatting so that downstream parsers see a wider variety of outputs"],
  a: [0],
  e: "Constraining output via **structured output / tool-use schemas** (plus validation) is more reliable than hoping free-text instructions are followed.",
  w: [
    "Schema-constrained output plus validation is the most reliable approach.",
    "maxTokens does not control format.",
    "Higher temperature increases format variability.",
    "Creativity is the opposite of a strict format."]
},

{
  id: "d1-093", d: 1, t: "1.6", s: "1.6.5", type: "single",
  sc: "A product team wants to improve a summarization prompt over time using real user ratings and corrections, without retraining a model.",
  q: "Which approach is MOST appropriate?",
  o: [
    "A feedback loop: collect ratings and corrections, add recurring failures to the evaluation set, refine the prompt, and re-test",
    "Ignore the feedback and keep the prompt fixed, since changing prompts would make results inconsistent",
    "Retrain a model from scratch after every rating so that the model is always fully up to date",
    "Delete negative feedback so that only positive examples are used to guide future prompt changes"],
  a: [0],
  e: "**Feedback loops** feed real-world failures into the test set and drive systematic prompt refinement, verified against evaluation before release.",
  w: [
    "Iterative, evidence-driven improvement verified against evaluation.",
    "Ignoring feedback prevents improvement.",
    "Disproportionate and slow for prompt-level issues.",
    "Hides the most useful signal."]
},

{
  id: "d1-094", d: 1, t: "1.6", s: "1.6.6", type: "single",
  sc: "A business analyst with no coding experience wants to build a workflow: take a customer email, classify its topic, retrieve relevant policy text from a knowledge base, and draft a reply, with a conditional branch for complaints.",
  q: "Which service is designed for this?",
  o: [
    "Amazon Bedrock Prompt Flows",
    "AWS CloudFormation templates written and deployed by the analyst for each workflow",
    "Amazon EC2 instances running a custom orchestration script that the analyst maintains",
    "AWS WAF rules that route emails to the prompts that match their topic"],
  a: [0],
  e: "**Prompt Flows** provides a visual builder that chains prompt, knowledge base and condition nodes without code.",
  w: [
    "A visual no-code builder that chains prompt, knowledge base and condition nodes.",
    "CloudFormation provisions infrastructure and requires template authoring.",
    "EC2 requires servers and code.",
    "WAF filters web requests and does not orchestrate prompts."]
},

{
  id: "d1-095", d: 1, t: "1.6", s: "1.6.6", type: "single",
  sc: "A workflow must pause for up to three days for a human approver, retry failed steps with backoff, and integrate with many AWS services. The team is considering Bedrock Prompt Flows.",
  q: "Which statement is MOST accurate?",
  o: [
    "Step Functions suits long-running, approval-based, retry-heavy orchestration; Prompt Flows suits visual prompt and model chaining",
    "Prompt Flows is required for human approval wait states because it is the only service that can pause a workflow for several days",
    "Neither service can express conditions, so all of the branching logic must be written in application code outside of them",
    "Amazon SNS alone can run the whole workflow, including long waits, retries and integrations with other AWS services"],
  a: [0],
  e: "**Step Functions** supports long waits (callbacks), Retry/Catch and broad service integrations. **Prompt Flows** targets prompt/model/KB/agent chaining.",
  w: [
    "Matches each service to its strength.",
    "Callback-based approval waits are a Step Functions strength.",
    "Both services support conditional logic.",
    "SNS is a notification service, not an orchestrator."]
},

{
  id: "d1-096", d: 1, t: "1.6", s: "1.6.6", type: "single",
  sc: "An application team wants to call a Prompt Flow from code and deploy new flow versions without changing application code.",
  q: "How should they reference the flow?",
  o: [
    "Create a flow version and call it through a flow alias that can be pointed at newer versions",
    "Hard-code the draft flow identifier in the application and edit the draft whenever a change is needed",
    "Copy the flow definition into the application code so that the application controls the logic directly",
    "Use the AWS CLI manually to run the flow for each request instead of calling it from code"],
  a: [0],
  e: "Flows use **versions and aliases**. Applications call a stable alias; you shift the alias to a new version to deploy or roll back.",
  w: [
    "Aliases decouple application code from flow versions and allow rollback.",
    "Editing drafts in production is unsafe and unversioned.",
    "Duplicated definitions prevent central updates.",
    "Not an application integration pattern."]
}
);
