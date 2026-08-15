import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../src/data');

const infographicData = {
  python: {
    title: "What is Python in Data Engineering?",
    subtitle: "Python is the core programming language used to build automated ETL pipelines, extract API data, and process datasets using Pandas & PySpark.",
    whyList: [
      "Simple & intuitive syntax",
      "Huge ecosystem (Pandas, PySpark, Airflow)",
      "Automates file processing & API calls",
      "Connects to all cloud databases",
      "Industry standard for Data Engineers"
    ],
    whereUsed: [
      { title: "Data Engineering", desc: "ETL pipelines, data cleaning & orchestration" },
      { title: "Data Analytics", desc: "Pandas DataFrames & automated reporting" },
      { title: "Machine Learning", desc: "Feature engineering & PyTorch" },
      { title: "Real-Time APIs", desc: "REST API data extraction & streaming" },
      { title: "Cloud Automation", desc: "AWS Lambda, Boto3 & Cloud Functions" }
    ],
    howItWorks: [
      { step: "1. Write Python Code", desc: "Scripting, Pandas DataFrames or Airflow DAGs" },
      { step: "2. Python Interpreter (CPython)", desc: "Compiles code into bytecode .pyc files" },
      { step: "3. Virtual Machine (PVM)", desc: "Executes bytecode line-by-line in memory RAM" },
      { step: "4. Output / Database Load", desc: "Streams data directly into S3, Postgres or Snowflake" }
    ],
    whenToUse: [
      "When building automated ETL data pipelines",
      "When transforming CSV, JSON, and Parquet files",
      "When orchestrating DAGs in Apache Airflow",
      "When building custom API extractors"
    ],
    coreConcepts: [
      { concept: "Generators (yield)", desc: "Streams big files line-by-line without high RAM usage" },
      { concept: "Pandas DataFrames", desc: "In-memory tabular data manipulation library" },
      { concept: "Decorators (@)", desc: "Wraps functions to add timing, retries & logging" },
      { concept: "Context Managers (with)", desc: "Ensures files & database connections close safely" },
      { concept: "Multiprocessing", desc: "Bypasses GIL to process data across CPU cores" }
    ],
    basicCode: `# Basic Python Ingestion Example\nimport json\n\ndef parse_user_payload(raw_json_str):\n    """Parses raw JSON payload safely"""\n    data = json.loads(raw_json_str)\n    return {\n        "user_id": data.get("id"),\n        "email": data.get("email").lower(),\n        "is_active": True\n    }\n\n# Execute\nresult = parse_user_payload('{"id": 101, "email": "SAI@EXAMPLE.COM"}')\nprint("Processed User:", result)`,
    advancedCode: `# Real-World Stream Ingestion with Generator\ndef stream_large_file(file_path):\n    with open(file_path, 'r') as file:\n        for line in file:\n            yield line.strip().split(',')\n\n# Memory stays below 50MB for 20GB files!\nfor row in stream_large_file("20gb_sales.csv"):\n    if len(row) > 3:\n        process_row(row)`,
    platforms: ["Local Machine", "AWS Lambda", "Airflow Workers", "Docker Containers"],
    summary: "Python = Readability + Huge Data Ecosystem. Essential tool for every Data Engineer.",
    subtopicDetails: {
      "py-sub-1": {
        title: "Python Data Structures (Lists, Dicts, Sets, Tuples)",
        subtitle: "Data structures are memory containers used to hold, index, and manipulate data during ETL pipeline execution.",
        whyList: [
          "Dicts provide O(1) instant lookup time",
          "Sets automatically eliminate duplicate IDs",
          "Lists maintain ordered event sequences",
          "Tuples provide immutable fixed schemas"
        ],
        codeSnippet: `# Real-Time Subtopic Example: Deduplicating IDs using Set\nraw_user_ids = ['usr_1', 'usr_2', 'usr_1', 'usr_3']\nunique_user_ids = set(raw_user_ids)\nprint("Deduplicated IDs:", list(unique_user_ids))`
      },
      "py-sub-2": {
        title: "Generators & Memory Optimization (yield)",
        subtitle: "Generators stream data line-by-line, preventing Out-Of-Memory (OOM) crashes when parsing multi-gigabyte log files.",
        whyList: [
          "Keeps RAM usage under 50MB for 20GB files",
          "Lazy evaluation: processes rows on demand",
          "Eliminates server crash risks"
        ],
        codeSnippet: `# Generator Line-by-Line Stream\ndef stream_logs(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()\n\nfor log in stream_logs('20gb_server.log'):\n    process(log)`
      },
      "py-sub-3": {
        title: "Object-Oriented Programming (OOP) in Pipelines",
        subtitle: "OOP builds modular, reusable database connectors and extractor classes with built-in retries and logging.",
        whyList: [
          "Encapsulates credentials and connection pooling",
          "Centralizes error handling and exponential retries",
          "Clean integration with Airflow Custom Hooks"
        ],
        codeSnippet: `class PostgresHook:\n    def __init__(self, uri):\n        self.uri = uri\n    def query(self, sql):\n        return f"Executing {sql} on {self.uri}"`
      }
    }
  },
  sql: {
    title: "What is SQL in Data Engineering?",
    subtitle: "SQL is the standard language used to query, aggregate, transform, and model relational data inside Data Warehouses like Snowflake, Redshift, and BigQuery.",
    whyList: [
      "Declarative language (say WHAT, not HOW)",
      "High performance warehousing engine",
      "Standard across all Data Warehouses",
      "Powerful window functions & CTEs",
      "Foundation for dbt transformations"
    ],
    whereUsed: [
      { title: "Data Warehousing", desc: "Snowflake, Redshift, BigQuery & Postgres" },
      { title: "Analytics Engineering", desc: "dbt data modeling & star schema transformations" },
      { title: "BI Dashboards", desc: "Tableau, PowerBI & Looker query layers" },
      { title: "Data Quality Checks", desc: "Uniqueness, null checks & anomaly detection" },
      { title: "Ad-Hoc Business Qs", desc: "Executive revenue & customer retention reports" }
    ],
    howItWorks: [
      { step: "1. Write SQL SELECT Query", desc: "Construct CTEs, JOINs, and Window Functions" },
      { step: "2. Query Optimizer", desc: "Database builds logical execution plan" },
      { step: "3. Storage Engine Access", desc: "Reads micro-partitions or indexed tables" },
      { step: "4. Output Result Set", desc: "Returns aggregated tabular dataset" }
    ],
    whenToUse: [
      "When joining relational tables and aggregating metrics",
      "When building analytical data marts (Star Schema)",
      "When ranking rows with DENSE_RANK() or ROW_NUMBER()",
      "When executing dbt SQL models"
    ],
    coreConcepts: [
      { concept: "Window Functions", desc: "Calculates over partitions without collapsing rows" },
      { concept: "CTEs (WITH)", desc: "Modular readable query blocks" },
      { concept: "INNER / LEFT JOIN", desc: "Combines matching rows across database tables" },
      { concept: "GROUP BY & HAVING", desc: "Aggregates rows and filters grouped metrics" },
      { concept: "INDEX & Partitioning", desc: "Speeds up query lookup performance" }
    ],
    basicCode: `-- Basic SQL Query Example\nSELECT \n  department_id,\n  COUNT(employee_id) AS total_employees,\n  AVG(salary) AS avg_salary\nFROM employees\nWHERE is_active = TRUE\nGROUP BY department_id\nHAVING AVG(salary) > 50000;`,
    advancedCode: `-- Advanced Window Function Query\nWITH RankedSalaries AS (\n  SELECT \n    employee_id,\n    department_id,\n    salary,\n    DENSE_RANK() OVER (\n      PARTITION BY department_id \n      ORDER BY salary DESC\n    ) AS rk\n  FROM employees\n)\nSELECT * FROM RankedSalaries WHERE rk <= 2;`,
    platforms: ["Snowflake", "Amazon Redshift", "Google BigQuery", "PostgreSQL"],
    summary: "SQL = The Universal Language of Data. Essential for every data analysis and warehouse task.",
    subtopicDetails: {
      "sql-sub-1": {
        title: "SQL Window Functions (DENSE_RANK, LAG, LEAD)",
        subtitle: "Window functions calculate running totals and rankings over partitions without collapsing table rows.",
        whyList: [
          "Solves Top-N ranking problems cleanly",
          "Calculates month-over-month sales growth using LAG()",
          "Avoids complex self-joins"
        ],
        codeSnippet: `SELECT customer_id, total_spend, DENSE_RANK() OVER (PARTITION BY country ORDER BY total_spend DESC) as rank FROM sales;`
      }
    }
  },
  pyspark: {
    title: "What is PySpark?",
    subtitle: "PySpark is the Python API for Apache Spark. It allows you to write big data applications in Python and run them on the Spark engine for distributed processing across cluster worker nodes.",
    whyList: [
      "Handle big data at scale (GBs to TBs)",
      "Distributed processing across clusters",
      "In-memory computation (up to 100x faster)",
      "Fault tolerance & DAG execution",
      "Unified engine (SQL, Streaming, ML)"
    ],
    whereUsed: [
      { title: "Data Engineering", desc: "ETL pipelines, data cleaning & transformation" },
      { title: "Big Data Analytics", desc: "Large scale data aggregation & metrics" },
      { title: "Machine Learning", desc: "Train models at scale with Spark MLlib" },
      { title: "Real-Time Streaming", desc: "Process live streaming data with Structured Streaming" },
      { title: "Data Science", desc: "Explore and visualize massive petabyte datasets" }
    ],
    howItWorks: [
      { step: "1. Write Python PySpark Code", desc: "PySpark DataFrame API or Spark SQL query" },
      { step: "2. PySpark API (Py4J Bridge)", desc: "Connects Python script to Spark JVM Engine" },
      { step: "3. Cluster Manager (YARN/K8s)", desc: "Allocates container resources across workers" },
      { step: "4. Worker Executors", desc: "Processes data partitions in parallel memory" }
    ],
    whenToUse: [
      "When data is too large for single machine RAM (>100GB)",
      "When you need distributed cluster compute power",
      "When processing streaming data streams",
      "When doing large scale ETL transformations"
    ],
    coreConcepts: [
      { concept: "SparkSession", desc: "Entry point to Spark; creates DataFrames & SQL" },
      { concept: "DataFrame", desc: "High-level distributed table API optimized by Catalyst" },
      { concept: "Lazy Evaluation", desc: "Builds execution DAG plan, executes on Action call" },
      { concept: "Broadcast Join", desc: "Copies small lookup table to workers, avoiding shuffle" },
      { concept: "Cache / Persist", desc: "Keeps intermediate DataFrame in memory for fast access" }
    ],
    basicCode: `# Basic PySpark DataFrame Example\nfrom pyspark.sql import SparkSession\n\nspark = SparkSession.builder \\\n    .appName("PySpark Overview") \\\n    .getOrCreate()\n\n# Read Parquet Data Lake file\ndf = spark.read.parquet("s3a://data-lake/sales/")\ndf.filter(df.amount > 100).groupBy("country").sum("amount").show()`,
    advancedCode: `# PySpark SQL Broadcast Join Example\nfrom pyspark.sql.functions import broadcast\n\nresult = sales_df.join(\n    broadcast(stores_df),\n    on="store_id",\n    how="inner"\n)\nresult.write.mode("overwrite").parquet("s3a://gold-lake/")`,
    platforms: ["Databricks", "AWS EMR", "Google Cloud Dataproc", "Local Spark Cluster"],
    summary: "PySpark = Python Ease + Spark Cluster Power. Essential for massive big data engineering.",
    subtopicDetails: {
      "spark-sub-1": {
        title: "PySpark Driver & Executor Distributed Architecture",
        subtitle: "Spark splits computations across 1 Driver node (master orchestrator) and N Executor nodes (worker parallelism).",
        whyList: [
          "Distributes 500GB files into 64MB partitions",
          "Executes parallel tasks across hundreds of CPU cores",
          "Self-healing fault tolerance if a worker node dies"
        ],
        codeSnippet: `# Inspecting Partition Distribution\nprint("Total Partitions:", sales_df.rdd.getNumPartitions())`
      }
    }
  },
  aws: {
    title: "What is AWS Data Engineering?",
    subtitle: "AWS Cloud Data Engineering combines S3 (Object Storage), EC2 (Compute), Glue (Catalog & Serverless ETL), and Athena (Serverless SQL) to build scalable cloud data lakes.",
    whyList: [
      "Serverless & Pay-As-You-Go pricing",
      "Infinite S3 storage scalability",
      "AWS Glue automated schema detection",
      "Serverless $5/TB Athena queries",
      "Enterprise IAM security & encryption"
    ],
    whereUsed: [
      { title: "Cloud Data Lakes", desc: "S3 Bronze, Silver & Gold storage layers" },
      { title: "Serverless ETL", desc: "AWS Glue PySpark jobs & Crawlers" },
      { title: "Ad-Hoc Analytics", desc: "Amazon Athena S3 SQL queries" },
      { title: "Cloud Compute", desc: "EC2 instances & EKS Kubernetes" },
      { title: "Automated Event Triggers", desc: "AWS Lambda S3 event triggers" }
    ],
    howItWorks: [
      { step: "1. Ingest to S3 Raw Bucket", desc: "Raw JSON/CSV files uploaded to s3://raw/" },
      { step: "2. AWS Glue Crawler", desc: "Scans S3 bucket & registers tables in Glue Catalog" },
      { step: "3. AWS Glue ETL Job", desc: "Transforms raw JSON into Parquet files" },
      { step: "4. Amazon Athena Query", desc: "Queries S3 Parquet tables using standard SQL" }
    ],
    whenToUse: [
      "When building cloud data lakes on AWS",
      "When you want serverless SQL over S3 files",
      "When cataloging datasets automatically with Glue",
      "When running scalable PySpark cloud jobs"
    ],
    coreConcepts: [
      { concept: "Amazon S3", desc: "Highly durable cloud object storage service" },
      { concept: "AWS Glue Catalog", desc: "Centralized metadata repository for data assets" },
      { concept: "Amazon Athena", desc: "Serverless interactive query service for S3" },
      { concept: "Parquet Format", desc: "Columnar storage format optimized for Athena" },
      { concept: "AWS IAM", desc: "Manages secure role access and permissions" }
    ],
    basicCode: `# AWS Boto3 S3 File Upload Example\nimport boto3\n\ns3_client = boto3.client('s3')\ns3_client.upload_file(\n    Filename='processed_data.csv',\n    Bucket='company-data-lake-silver',\n    Key='raw_sales/2026/08/processed_data.csv'\n)`,
    advancedCode: `-- Athena Create Parquet Table SQL\nCREATE EXTERNAL TABLE IF NOT EXISTS analytics.sales (\n  transaction_id STRING,\n  amount DOUBLE,\n  event_date DATE\n)\nSTORED AS PARQUET\nLOCATION 's3://company-lake-silver/sales/';`,
    platforms: ["AWS Cloud", "Amazon EMR", "AWS Glue Studio", "AWS Lambda"],
    summary: "AWS = Scalable Cloud Infrastructure. The leading cloud platform for enterprise data lakes.",
    subtopicDetails: {
      "aws-sub-1": {
        title: "Amazon S3 Medallion Data Lake Architecture",
        subtitle: "Organizes S3 buckets into Bronze (Raw Data), Silver (Cleaned Data), and Gold (Business Aggregated Data) layers.",
        whyList: [
          "Separates raw landing data from clean analytical tables",
          "Supports schema evolution and incremental loads",
          "Optimizes storage costs with S3 Lifecycle Policies"
        ],
        codeSnippet: `# S3 Bucket Paths\ns3://company-lake-bronze/raw_json/\ns3://company-lake-silver/clean_parquet/\ns3://company-lake-gold/marts_reporting/`
      }
    }
  },
  hive: {
    title: "What is Apache Hive?",
    subtitle: "Apache Hive is a distributed data warehouse software built on top of Apache Hadoop for reading, writing, and managing large datasets residing in HDFS using HiveQL (SQL).",
    whyList: [
      "SQL abstraction over MapReduce / Spark",
      "Hive Metastore schema catalog",
      "Partitioning & Bucketing query speedups",
      "ACID transactional table support"
    ],
    whereUsed: [
      { title: "Big Data Warehousing", desc: "Querying petabytes of HDFS data with SQL" },
      { title: "Metastore Catalog", desc: "Sharing table metadata with Spark and Presto" }
    ],
    howItWorks: [
      { step: "1. HiveQL Query", desc: "User writes standard SQL statement" },
      { step: "2. Hive Driver & Compiler", desc: "Converts SQL into MapReduce/Tez execution plan" },
      { step: "3. Metastore Lookup", desc: "Fetches table HDFS partition locations" },
      { step: "4. HDFS Execution", desc: "Executes distributed read and returns rows" }
    ],
    whenToUse: [
      "When running batch SQL queries over Hadoop HDFS data lakes",
      "When managing Hive Metastore catalogs"
    ],
    coreConcepts: [
      { concept: "Hive Metastore", desc: "Central database storing table schemas & HDFS locations" },
      { concept: "External Tables", desc: "Preserves HDFS files when table is dropped" },
      { concept: "Partitioning", desc: "Divides tables into subfolders by column (e.g. year/month)" },
      { concept: "Bucketing", desc: "Hashes data into fixed file buckets inside partitions" }
    ],
    basicCode: `-- Create Hive External Table SQL\nCREATE EXTERNAL TABLE IF NOT EXISTS hdfs_sales (\n  id INT,\n  amount DOUBLE\n)\nPARTITIONED BY (country STRING)\nSTORED AS ORC\nLOCATION '/user/hive/warehouse/sales';`,
    advancedCode: `-- Insert Overwrite Partition\nINSERT OVERWRITE TABLE hdfs_sales PARTITION (country='US')\nSELECT id, amount FROM staging_sales WHERE country='US';`,
    platforms: ["Hadoop HDFS", "Cloudera CDP", "AWS EMR"],
    summary: "Hive = SQL Engine over Hadoop HDFS. Bridges relational SQL with distributed file systems.",
    subtopicDetails: {}
  },
  hadoop: {
    title: "What is Apache Hadoop?",
    subtitle: "Apache Hadoop is an open-source framework used to store and process big data across clusters of commodity hardware using HDFS and YARN.",
    whyList: [
      "Fault-tolerant HDFS storage (3x replication)",
      "YARN cluster resource management",
      "Scales horizontally to thousands of nodes",
      "Handles unstructured, semi-structured & structured data"
    ],
    whereUsed: [
      { title: "Distributed Storage", desc: "HDFS file system for data lakes" },
      { title: "Resource Scheduling", desc: "YARN container allocation for Spark and MapReduce" }
    ],
    howItWorks: [
      { step: "1. Client Upload", desc: "Splits file into 128MB HDFS blocks" },
      { step: "2. NameNode Metadata", desc: "Tracks block locations across DataNodes" },
      { step: "3. DataNode Storage", desc: "Stores 3 copies of each block for fault tolerance" },
      { step: "4. YARN Scheduling", desc: "Allocates CPU/RAM containers for computation" }
    ],
    whenToUse: [
      "When storing petabytes of data on on-premise server clusters",
      "When managing distributed cluster resources with YARN"
    ],
    coreConcepts: [
      { concept: "HDFS NameNode", desc: "Master node maintaining file metadata directory tree" },
      { concept: "HDFS DataNode", desc: "Worker nodes storing actual 128MB file blocks" },
      { concept: "YARN ResourceManager", desc: "Arbitrates cluster compute resources" },
      { concept: "Replication Factor", desc: "Defaults to 3x redundancy across racks" }
    ],
    basicCode: `# Basic HDFS Shell Commands\nhdfs dfs -mkdir -p /user/data_lake/raw/\nhdfs dfs -put local_file.csv /user/data_lake/raw/\nhdfs dfs -ls /user/data_lake/raw/`,
    advancedCode: `# Check HDFS Cluster Health & Block Status\nhdfs fsck /user/data_lake/ -files -blocks -locations`,
    platforms: ["On-Prem Hadoop Clusters", "Cloudera CDP", "AWS EMR"],
    summary: "Hadoop = HDFS Storage + YARN Compute. The foundation of modern big data systems.",
    subtopicDetails: {}
  },
  snowflake: {
    title: "What is Snowflake Data Cloud?",
    subtitle: "Snowflake is a fully managed cloud data warehouse built on a multi-cluster shared data architecture that decouples compute (Virtual Warehouses) from storage.",
    whyList: [
      "Decoupled storage & compute scaling",
      "Zero-Copy Cloning in 1 second",
      "Time Travel data recovery (up to 90 days)",
      "Zero infrastructure management",
      "Instant auto-suspend & auto-resume"
    ],
    whereUsed: [
      { title: "Enterprise Data Warehousing", desc: "Central cloud analytics hub" },
      { title: "Data Sharing", desc: "Secure cross-company data exchange without copying files" }
    ],
    howItWorks: [
      { step: "1. Centralized Cloud Storage", desc: "Micro-partitions stored in S3/Azure Blob" },
      { step: "2. Multi-Cluster Compute", desc: "Virtual Warehouses process SQL queries independently" },
      { step: "3. Cloud Services Layer", desc: "Handles authentication, metadata & optimization" }
    ],
    whenToUse: [
      "When you need instant scalable cloud data warehousing",
      "When cloning production databases for staging environments instantly"
    ],
    coreConcepts: [
      { concept: "Virtual Warehouse", desc: "Independent compute cluster (X-Small to 6X-Large)" },
      { concept: "Micro-Partitions", desc: "Immutable 50MB-150MB compressed columnar files" },
      { concept: "Zero-Copy Cloning", desc: "Creates metadata clones without duplicating storage cost" },
      { concept: "Time Travel", desc: "Queries past historical data states using AT(TIMESTAMP => ...)" }
    ],
    basicCode: `-- Create Snowflake Virtual Warehouse\nCREATE WAREHOUSE IF NOT EXISTS etl_wh\n  WITH WAREHOUSE_SIZE = 'MEDIUM'\n  AUTO_SUSPEND = 60\n  AUTO_RESUME = TRUE;`,
    advancedCode: `-- Snowflake Zero-Copy Clone & Time Travel\nCREATE DATABASE dev_staging CLONE prod_db;\n\nSELECT * FROM prod_db.sales.orders AT(TIMESTAMP => '2026-08-15 10:00:00');`,
    platforms: ["AWS Cloud", "Microsoft Azure", "Google Cloud Platform"],
    summary: "Snowflake = Decoupled Storage + Compute Cloud Power. Modern enterprise data warehouse standard.",
    subtopicDetails: {}
  },
  dbt: {
    title: "What is dbt (data build tool)?",
    subtitle: "dbt is a transformation framework that lets Data Engineers write SQL SELECT models, manage dependencies as DAGs, test data quality, and compile documentation inside Data Warehouses.",
    whyList: [
      "Modular SQL data modeling (stg -> int -> marts)",
      "Automated DAG lineage graph generation",
      "Built-in data quality testing (unique, not_null)",
      "Version controlled transformations with Git",
      "Incremental materializations"
    ],
    whereUsed: [
      { title: "Analytics Engineering", desc: "Transforming raw data into Star Schema Data Marts" },
      { title: "Data Quality Testing", desc: "Automating null and primary key constraint checks" }
    ],
    howItWorks: [
      { step: "1. Write SQL Models", desc: "Write SELECT queries using Jinja {{ ref('model') }}" },
      { step: "2. dbt Compile", desc: "Compiles Jinja into raw SQL DDL/DML code" },
      { step: "3. Warehouse Execution", desc: "Executes CREATE TABLE/VIEW inside Snowflake/BigQuery" },
      { step: "4. Documentation & Lineage", desc: "Generates interactive DAG lineage graphs" }
    ],
    whenToUse: [
      "When transforming raw database tables into analytical data marts",
      "When implementing data quality tests inside CI/CD pipelines"
    ],
    coreConcepts: [
      { concept: "ref() Function", desc: "Establishes dependencies between models for DAG creation" },
      { concept: "Staging Layer", desc: "1-to-1 cleanup models over raw source tables" },
      { concept: "Marts Layer", desc: "Business-ready dimensional tables (Facts & Dimensions)" },
      { concept: "dbt test", desc: "Runs assertions against columns to ensure data integrity" }
    ],
    basicCode: `-- dbt Staging Model: stg_customers.sql\nWITH raw_data AS (\n  SELECT * FROM {{ source('raw_db', 'customers') }}\n)\nSELECT \n  id AS customer_id,\n  LOWER(email) AS email_address\nFROM raw_data;`,
    advancedCode: `-- dbt Mart Model: dim_customers.sql\nSELECT \n  c.customer_id,\n  c.email_address,\n  COUNT(o.order_id) AS total_orders\nFROM {{ ref('stg_customers') }} c\nLEFT JOIN {{ ref('stg_orders') }} o ON c.customer_id = o.customer_id\nGROUP BY 1, 2;`,
    platforms: ["dbt Core CLI", "dbt Cloud", "Airflow Operators"],
    summary: "dbt = Software Engineering Practices for SQL. Standardizes analytics engineering transformation pipelines.",
    subtopicDetails: {}
  }
};

fs.writeFileSync(path.join(outDir, 'infographic_topics_db.json'), JSON.stringify(infographicData, null, 2));
console.log('Successfully generated complete subtopic-aware JSON infographic_topics_db.json!');
