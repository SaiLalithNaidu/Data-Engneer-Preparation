import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const knowledgeBase = {
  metadata: {
    title: "Data Engineer Interview & Concept Preparation Suite",
    totalDocumentsIndexed: 18,
    lastUpdated: new Date().toISOString()
  },
  roadmap: [
    {
      step: 1,
      id: "python-de",
      title: "Python for Data Engineering",
      icon: "Code",
      star: false,
      readingTime: "15 min",
      summary: "Data structures, Lambda, List Comprehensions, Pandas DataFrames, APIs, and PostgreSQL/SQLAlchemy ETL pipelines.",
      topics: [
        {
          id: "python-de-core",
          title: "Python Data Pipelines & File Processing",
          category: "Python",
          readingTime: "15 min",
          difficulty: "Medium",
          summary: "Master file handling (CSV, JSON, Parquet), Pandas API integration, environment variables, and modular ETL functions.",
          content: `### Python in Data Engineering\nPython is the primary scripting language for building ETL pipelines, interacting with cloud APIs (boto3), and transforming datasets using Pandas/PySpark.\n\n---\n\n### Core Data Engineering Concepts in Python\n1. **Generators & Iterators**: Memory-efficient processing of large text files line-by-line using \`yield\`.\n2. **Pandas Transformations**: DataFrames, \`groupby()\`, \`merge()\`, \`pivot()\`, handling NULL values.\n3. **Database Drivers**: Connecting to PostgreSQL/Redshift via \`psycopg2\` and \`SQLAlchemy\`.\n4. **Testing & Modular Design**: Unit testing ETL functions with \`pytest\` and logging pipeline execution.`,
          codeExamples: [
            {
              title: "Modular API → Pandas → PostgreSQL Pipeline",
              language: "python",
              code: "import pandas as pd\nimport requests\nfrom sqlalchemy import create_engine\n\ndef extract_api_data(url):\n    response = requests.get(url)\n    return pd.DataFrame(response.json())\n\ndef transform_data(df):\n    df['created_at'] = pd.to_datetime(df['created_at'])\n    df['amount_cents'] = (df['amount'] * 100).astype(int)\n    return df.dropna(subset=['customer_id'])\n\ndef load_postgres(df, connection_str):\n    engine = create_engine(connection_str)\n    df.to_sql('fact_sales', engine, if_exists='append', index=False)\n\nif __name__ == '__main__':\n    data = extract_api_data('https://api.example.com/transactions')\n    clean_data = transform_data(data)\n    load_postgres(clean_data, 'postgresql://user:pass@localhost:5432/analytics')"
            }
          ],
          interviewQuestions: [
            {
              question: "How do Python generators optimize memory usage when reading huge 50GB CSV files?",
              answer: "Generators return an iterator that yields one item at a time lazily using the `yield` keyword, storing only a single row in memory instead of loading the entire 50GB file into RAM at once.",
              difficulty: "Medium",
              companyTags: ["Google", "Amazon", "Meta"]
            }
          ]
        }
      ]
    },
    {
      step: 2,
      id: "sql-intensive",
      title: "SQL & Data Modeling Masterclass",
      icon: "Database",
      star: false,
      readingTime: "15 min",
      summary: "SQL query optimization, Window Functions (DENSE_RANK, LAG/LEAD), Joins, CTEs, Indexing, Star Schema, Facts & Dimensions.",
      topics: [
        {
          id: "sql-window-functions",
          title: "SQL Window Functions & Analytical Queries",
          category: "SQL Core",
          readingTime: "12 min",
          difficulty: "Medium",
          summary: "Deep dive into ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), and frame clauses for advanced analytical queries.",
          interactiveSimulatorId: "window-functions",
          content: `### SQL Window Functions Overview\nA window function performs calculations across table rows related to the current row without collapsing rows into a summary row.\n\n---\n\n### Core Syntax\n\`\`\`sql\nFUNCTION_NAME() OVER (\n  PARTITION BY partition_col\n  ORDER BY sort_col DESC\n)\n\`\`\`\n\n### Analytical Ranking\n* **ROW_NUMBER()**: Unique sequential numbers.\n* **RANK()**: Handles ties by repeating rank and skipping subsequent ranks (1, 2, 2, 4).\n* **DENSE_RANK()**: Handles ties without skipping ranks (1, 2, 2, 3).`,
          codeExamples: [
            {
              title: "Find 2nd Highest Salary per Department",
              language: "sql",
              code: "WITH RankedSalaries AS (\n  SELECT \n    employee_id, \n    department_id, \n    salary,\n    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk\n  FROM employees\n)\nSELECT employee_id, department_id, salary\nFROM RankedSalaries\nWHERE rk = 2;"
            }
          ],
          interviewQuestions: [
            {
              question: "What is the difference between RANK() and DENSE_RANK()?",
              answer: "RANK() skips rank numbers after ties (1, 2, 2, 4), while DENSE_RANK() does not skip numbers (1, 2, 2, 3).",
              difficulty: "Medium",
              companyTags: ["Amazon", "Google", "Databricks"]
            }
          ]
        }
      ]
    },
    {
      step: 3,
      id: "pyspark-internals",
      title: "PySpark & Spark Internals",
      icon: "Zap",
      star: true,
      readingTime: "20 min",
      summary: "Spark Architecture (Driver/Executors, DAG Scheduler), RDD vs DataFrame, Transformations vs Actions, AQE, Salting, Skew, and Broadcast Joins.",
      topics: [
        {
          id: "pyspark-spark-internals",
          title: "PySpark Performance Tuning & Execution Architecture",
          category: "Apache Spark",
          readingTime: "18 min",
          difficulty: "Hard",
          summary: "Master Driver-Executor cluster architecture, Shuffle Hash Join vs Sort-Merge Join, Salting for data skew, and AQE (Adaptive Query Execution).",
          interactiveSimulatorId: "join-simulator",
          content: `### Apache Spark Architecture & Internals\nApache Spark is a distributed computing engine powered by a **Driver Node** (orchestrates DAG creation) and **Executor Nodes** (execute tasks in parallel).\n\n---\n\n### Performance Optimization Strategies\n1. **Adaptive Query Execution (AQE)**: Dynamically coalesces shuffle partitions and converts sort-merge joins to broadcast joins.\n2. **Salting Strategy**: Adds random noise to spread skewed keys across executor partitions.\n3. **Broadcast Joins**: Eliminates network shuffle when joining a small DataFrame (<10MB) with a huge DataFrame.`,
          codeExamples: [
            {
              title: "Salting Strategy in PySpark for Skewed Joins",
              language: "python",
              code: "from pyspark.sql.functions import concat, lit, expr, floor, rand\n\nSALT_FACTOR = 4\nskewed_df = skewed_df.withColumn('salt', floor(rand() * SALT_FACTOR))\nskewed_df = skewed_df.withColumn('salted_key', concat('user_id', lit('_'), 'salt'))\n\nlookup_df = lookup_df.withColumn('salt_array', expr('array(0, 1, 2, 3)'))\nlookup_df = lookup_df.select('*', expr('explode(salt_array) as salt'))\nlookup_df = lookup_df.withColumn('salted_key', concat('user_id', lit('_'), 'salt'))\n\nresult_df = skewed_df.join(lookup_df, 'salted_key', 'inner')"
            }
          ],
          interviewQuestions: [
            {
              question: "What happens during a Spark Shuffle and why is it expensive?",
              answer: "A shuffle redistributes data across cluster nodes when wide transformations (groupBy, join) require matching keys on the same partition. Shuffling involves disk I/O, serialization, and network transfers.",
              difficulty: "Hard",
              companyTags: ["Databricks", "Uber", "Apple"]
            }
          ]
        }
      ]
    },
    {
      step: 4,
      id: "hadoop-hive",
      title: "Hadoop + Hive Ecosystem",
      icon: "Server",
      star: false,
      readingTime: "12 min",
      summary: "HDFS Architecture (NameNode, DataNode, 128MB Blocks), MapReduce (Shuffle & Sort), YARN ResourceManager, HiveQL Managed/External tables, ORC & Parquet formats.",
      topics: [
        {
          id: "hadoop-hive-core",
          title: "Hadoop HDFS, YARN & Hive Data Warehousing",
          category: "Big Data Foundations",
          readingTime: "12 min",
          difficulty: "Medium",
          summary: "Understand NameNode/DataNode architecture, block replication (3x), YARN container allocation, and Hive Metastore tables.",
          content: `### Apache Hadoop Architecture\nHadoop provides reliable, scalable, distributed computing across commodity hardware.\n\n---\n\n### Core Components\n1. **HDFS**: Master-Worker architecture with NameNode and DataNodes (128MB blocks).\n2. **YARN**: ResourceManager and NodeManager container scheduler.\n3. **Apache Hive**: Managed Tables (Hive owns data & metadata) vs External Tables (Hive owns metadata only).`,
          codeExamples: [
            {
              title: "Creating Partitioned External Table in Hive",
              language: "sql",
              code: "CREATE EXTERNAL TABLE IF NOT EXISTS sales_hive (\n  sale_id INT,\n  customer_id INT,\n  amount DOUBLE\n)\nPARTITIONED BY (sale_date STRING)\nSTORED AS ORC\nLOCATION 's3://my-company-datalake/hive/sales/';\n\nMSCK REPAIR TABLE sales_hive;"
            }
          ],
          interviewQuestions: [
            {
              question: "What is the difference between Hive Managed Tables and External Tables?",
              answer: "For Managed tables, Hive owns both metadata and data files (dropping table deletes data). For External tables, Hive owns metadata only (dropping table deletes metadata, preserving raw S3/HDFS files).",
              difficulty: "Medium",
              companyTags: ["Cloudera", "Amazon", "Walmart"]
            }
          ]
        }
      ]
    },
    {
      step: 5,
      id: "aws-s3",
      title: "AWS S3 Cloud Data Lake",
      icon: "Cloud",
      star: true,
      readingTime: "10 min",
      summary: "Amazon S3 Object Storage, Data Lake Layout (Raw/Bronze, Silver/Curated, Gold/Marts), S3 Lifecycle Policies, Storage Classes, IAM Policies, Bucket Security.",
      topics: [
        {
          id: "aws-s3-datalake",
          title: "Amazon S3 Data Lake Architecture & Security",
          category: "AWS Cloud",
          readingTime: "10 min",
          difficulty: "Medium",
          summary: "Design scalable cloud data lake bucket layouts, partition prefixes, lifecycle rules, S3 Express One Zone, and KMS encryption.",
          content: `### Amazon S3 Data Lake Foundation\nAmazon S3 (Simple Storage Service) is the default object storage layer for modern cloud data lakes.\n\n---\n\n### Data Lake Medallion Bucket Partitioning\n* **Raw / Bronze**: s3://company-lake/raw/source=crm/dt=2025-06-15/\n* **Silver / Cleaned**: s3://company-lake/silver/dataset=orders/year=2025/month=06/\n* **Gold / Aggregated**: s3://company-lake/gold/mart=sales_summary/`,
          codeExamples: [
            {
              title: "Boto3 Python Script for Uploading Partitioned S3 Files",
              language: "python",
              code: "import boto3\nfrom datetime import datetime\n\ns3_client = boto3.client('s3')\n\ndef upload_to_s3_lake(file_path, bucket, dataset_name):\n    today = datetime.now().strftime('%Y-%m-%d')\n    s3_key = f'raw/{dataset_name}/dt={today}/{file_path}'\n    s3_client.upload_file(file_path, bucket, s3_key)\n    print(f'Uploaded to s3://{bucket}/{s3_key}')"
            }
          ],
          interviewQuestions: [
            {
              question: "How does prefix partitioning in S3 improve Athena query performance?",
              answer: "Partitioning files by date/category prefixes (e.g., year=2025/month=06/) enables partition pruning, allowing engines to scan only relevant prefixes rather than full buckets.",
              difficulty: "Medium",
              companyTags: ["AWS", "Amazon", "Netflix"]
            }
          ]
        }
      ]
    },
    {
      step: 6,
      id: "aws-glue-athena",
      title: "AWS Glue + Athena Serverless",
      icon: "CloudRain",
      star: true,
      readingTime: "15 min",
      summary: "AWS Glue Data Catalog, Crawlers, Glue PySpark ETL Jobs, Serverless Athena SQL, DynamicFrames, Partition Pruning, and Glue Studio.",
      topics: [
        {
          id: "aws-glue-athena-core",
          title: "AWS Glue Crawlers, Catalog & Athena Serverless SQL",
          category: "AWS Analytics",
          readingTime: "15 min",
          difficulty: "Hard",
          summary: "Build end-to-end serverless ETL pipelines: S3 Raw → Glue Crawler → Glue PySpark → Parquet Silver → Athena SQL queries.",
          content: `### AWS Glue & Athena Ecosystem\nAWS Glue is a serverless data integration service, while Amazon Athena is an interactive serverless SQL query engine over S3 data.\n\n---\n\n### Core Architecture\n1. **Glue Crawler**: Scans S3 files, infers schema, registers Glue Data Catalog tables.\n2. **Glue PySpark Job**: Distributed Spark ETL jobs without managing EC2 infra.\n3. **Glue DynamicFrame**: Glue extension handling nested data gracefully.`,
          codeExamples: [
            {
              title: "AWS Glue PySpark Script (JSON → Partitioned Parquet)",
              language: "python",
              code: "from awsglue.context import GlueContext\nfrom pyspark.context import SparkContext\n\nglueContext = GlueContext(SparkContext.getOrCreate())\ndynamic_df = glueContext.create_dynamic_frame.from_catalog(database=\"crm_db\", table_name=\"raw_orders\")\ndf = dynamic_df.toDF().filter(\"status = 'COMPLETED'\")\ndf.write.mode(\"overwrite\").partitionBy(\"year\", \"month\").parquet(\"s3://my-lake/silver/orders/\")"
            }
          ],
          interviewQuestions: [
            {
              question: "How does Amazon Athena price queries and how can you optimize costs?",
              answer: "Athena charges $5 per TB scanned. Optimize by converting files to Parquet/ORC, partitioning by date/region, and compressing with Snappy/ZSTD.",
              difficulty: "Hard",
              companyTags: ["AWS", "Capital One", "Fintech"]
            }
          ]
        }
      ]
    },
    {
      step: 7,
      id: "aws-emr",
      title: "Amazon EMR (Elastic MapReduce)",
      icon: "Cpu",
      star: false,
      readingTime: "12 min",
      summary: "Amazon EMR Managed Spark & Hadoop Clusters, Master/Core/Task Nodes, EMR Serverless, Spot Instance Cost Optimization, and S3 Select integration.",
      topics: [
        {
          id: "aws-emr-clusters",
          title: "Amazon EMR Big Data Clusters & Performance Tuning",
          category: "AWS Cloud",
          readingTime: "12 min",
          difficulty: "Hard",
          summary: "Configure EMR Master, Core, and Task nodes, leverage Spot EC2 instances safely, and run multi-terabyte Spark jobs.",
          content: `### Amazon EMR Architecture\nAmazon EMR is a cloud big data platform for processing massive datasets using Apache Spark, Hadoop, and Hive.\n\n---\n\n### EMR Node Types\n* **Master Node**: Runs YARN ResourceManager & HDFS NameNode.\n* **Core Node**: Runs DataNode & YARN NodeManager (stores HDFS data).\n* **Task Node**: Compute capacity ONLY (ideal for EC2 Spot Instances!).`,
          codeExamples: [
            {
              title: "Submitting Spark Job to AWS EMR via CLI",
              language: "bash",
              code: "aws emr add-steps --cluster-id j-2AXXXXXX --steps Type=Spark,Name=\"SalesETL\",ActionOnFailure=CONTINUE,Args=[--deploy-mode,cluster,--master,yarn,s3://my-code-bucket/spark_script.py]"
            }
          ],
          interviewQuestions: [
            {
              question: "How do you use EC2 Spot Instances safely in an EMR cluster?",
              answer: "Use Spot instances ONLY for Task Nodes (pure compute capacity). Master and Core nodes must run on On-Demand instances to prevent HDFS data loss if Spot instances are reclaimed.",
              difficulty: "Hard",
              companyTags: ["AWS", "Amazon", "Stripe"]
            }
          ]
        }
      ]
    },
    {
      step: 8,
      id: "snowflake-dwh",
      title: "Snowflake Cloud Data Warehouse",
      icon: "Snowflake",
      star: true,
      readingTime: "15 min",
      summary: "Snowflake 3-Layer Architecture (Cloud Services, Virtual Warehouses, Micro-partitions), Copy Into, Snowpipe streaming, Streams & Tasks, Zero-Copy Clone, Time Travel.",
      topics: [
        {
          id: "snowflake-architecture",
          title: "Snowflake Architecture & Production Engineering",
          category: "Snowflake",
          readingTime: "12 min",
          difficulty: "Medium",
          summary: "Deep dive into Database Storage, Virtual Warehouses (Compute), and Cloud Services layer isolation.",
          interactiveSimulatorId: "snowflake-arch",
          content: `### Snowflake Architecture Overview\nSnowflake utilizes a multi-cluster shared data architecture that separates storage, compute, and management services.\n\n---\n\n### The 3 Decoupled Layers\n1. **Database Storage**: Hybrid columnar micro-partitions in S3/Blob storage.\n2. **Query Processing (Virtual Warehouses)**: Decoupled MPP compute clusters.\n3. **Cloud Services**: Metadata, security, optimization.`
        }
      ]
    },
    {
      step: 9,
      id: "dbt-transformations",
      title: "dbt (data build tool)",
      icon: "Layers",
      star: true,
      readingTime: "15 min",
      summary: "dbt Core / Cloud, Staging → Intermediate → Marts modeling layer, Jinja templating, Materializations (View, Table, Incremental, Ephemeral), dbt tests, dbt docs lineage.",
      topics: [
        {
          id: "dbt-core-modeling",
          title: "dbt Data Modeling, Materializations & Testing",
          category: "Transformation",
          readingTime: "15 min",
          difficulty: "Hard",
          summary: "Build modular SQL data transformation pipelines inside Snowflake/Redshift using dbt Jinja, incremental models, and automated schema tests.",
          content: `### dbt Overview\ndbt enables data engineers to transform data inside their warehouse by writing SQL SELECT statements. dbt handles materializing models as tables/views, running automated tests, and generating lineage graphs.\n\n---\n\n### dbt Materialization Types\n* **View**: Recreates view on every execution.\n* **Table**: Drops and recreates full table.\n* **Incremental**: Inserts/updates only new rows since last run using MERGE INTO.`
        }
      ]
    },
    {
      step: 10,
      id: "airflow-orchestration",
      title: "Apache Airflow Orchestration",
      icon: "GitBranch",
      star: true,
      readingTime: "15 min",
      summary: "Airflow Architecture, DAGs, Taskflow API, Operators vs Sensors, XComs, Executors (Local, Celery, Kubernetes), Cron Masterclass, SLA alerts, Idempotency.",
      topics: [
        {
          id: "airflow-zero-to-hero",
          title: "Apache Airflow Zero to Hero Masterclass",
          category: "Orchestration",
          readingTime: "15 min",
          difficulty: "Medium",
          summary: "Learn DAG design best practices, XCom task communication, Operators vs Sensors, and Cron scheduling.",
          interactiveSimulatorId: "airflow-dag",
          content: `### Apache Airflow Architecture\nAirflow programmatically authors, schedules, and monitors data pipeline workflows as Directed Acyclic Graphs (DAGs).`
        }
      ]
    },
    {
      step: 11,
      id: "capstone-real-project",
      title: "Real-World End-to-End Capstone Project",
      icon: "Rocket",
      star: false,
      readingTime: "25 min",
      summary: "AI-Powered Customer/Sales Data Platform: API Source → S3 Bronze → PySpark Clean → Snowflake Gold → dbt Marts → Airflow Orchestration → CI/CD.",
      topics: [
        {
          id: "capstone-project-guide",
          title: "End-to-End Cloud Data AI Platform Architecture",
          category: "Real Project",
          readingTime: "25 min",
          difficulty: "Hard",
          summary: "Complete blueprint for building and presenting a production-style Data Engineering portfolio project for senior interviews.",
          content: `### Real-World Capstone Project Architecture\nThis end-to-end project combines all 10 core technologies into a unified production pipeline.\n\n---\n\n### Data Flow Architecture\n1. Source APIs & PostgreSQL → 2. S3 Raw Bronze → 3. PySpark Transformation → 4. Delta/Parquet Silver → 5. Snowflake Warehouse → 6. dbt Marts (SCD Type 2) → 7. Airflow DAG Orchestration`
        }
      ]
    }
  ],
  modules: [
    {
      id: "sql-dwh",
      title: "SQL & Data Warehousing Masterclass",
      icon: "Database",
      description: "Master SQL Window Functions, Joins, ACID Properties, Indexing, Partitioning, SCD Types 1/2/3/6, Data Modeling, and Query Performance.",
      topics: [
        {
          id: "sql-window-functions",
          title: "SQL Window Functions & Analytical Queries",
          category: "SQL Core",
          readingTime: "12 min",
          difficulty: "Medium",
          summary: "Deep dive into ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), and frame clauses for advanced analytical queries.",
          interactiveSimulatorId: "window-functions",
          sourceFile: "WINDOW_FUNCTIONS.pdf",
          content: `### What are SQL Window Functions?\nA window function performs a calculation across a set of table rows related to the current row without collapsing rows into a summary row.`
        }
      ]
    }
  ],
  flashcards: [
    { id: "fc-1", topicId: "python-de-core", question: "What is a Python generator and why is it used in ETL?", answer: "A generator yields items lazily using `yield` one by one, keeping memory usage constant (O(1)) when reading large files.", category: "Python" },
    { id: "fc-2", topicId: "sql-window-functions", question: "What is the difference between RANK() and DENSE_RANK() in SQL?", answer: "RANK() skips rank numbers after a tie (1, 2, 2, 4), whereas DENSE_RANK() does NOT skip rank numbers (1, 2, 2, 3).", category: "SQL" },
    { id: "fc-3", topicId: "pyspark-spark-internals", question: "What is data salting in PySpark?", answer: "Salting adds a random integer suffix to skewed join keys to distribute heavy keys across multiple executor partitions evenly.", category: "PySpark" },
    { id: "fc-4", topicId: "aws-glue-athena-core", question: "How does Amazon Athena price queries?", answer: "Athena charges $5 per TB of data scanned. Cost is reduced by partitioning and using columnar formats (Parquet/ORC).", category: "AWS" },
    { id: "fc-5", topicId: "snowflake-architecture", question: "What are the 3 layers of Snowflake architecture?", answer: "1. Database Storage Layer (Micro-partitions)\n2. Query Processing Layer (Virtual Warehouses)\n3. Cloud Services Layer", category: "Snowflake" },
    { id: "fc-6", topicId: "dbt-core-modeling", question: "What is the difference between dbt view and incremental materialization?", answer: "View recreates the view on every run. Incremental inserts/updates only new rows since the last execution using MERGE INTO.", category: "dbt" }
  ],
  quizzes: [
    {
      id: "q-1",
      title: "SQL & PySpark Interview Challenge",
      category: "SQL & PySpark",
      questions: [
        {
          id: "sq-1",
          question: "Which window function assigns unique sequential integers to rows starting at 1 for each partition?",
          options: ["RANK()", "ROW_NUMBER()", "DENSE_RANK()", "NTILE()"],
          correctIndex: 1,
          explanation: "ROW_NUMBER() assigns a unique sequential integer to each row in a partition."
        },
        {
          id: "sq-2",
          question: "Which join strategy in PySpark avoids expensive network shuffles when joining a 5MB dimension table with a 500GB fact table?",
          options: ["Sort-Merge Join", "Broadcast Hash Join", "Shuffle Hash Join", "Cartesian Product"],
          correctIndex: 1,
          explanation: "Broadcast Hash Join broadcasts the small 5MB DataFrame to all worker nodes, eliminating network shuffle."
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(outDir, 'data_engineer_knowledge_base.json'), JSON.stringify(knowledgeBase, null, 2));
console.log('Successfully generated data_engineer_knowledge_base.json!');
