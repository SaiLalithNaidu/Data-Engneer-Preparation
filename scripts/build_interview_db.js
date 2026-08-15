import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const interviewDB = {
  metadata: {
    title: "Data Engineer Topic-Wise Technical & Interview Question Bank",
    lastUpdated: new Date().toISOString()
  },
  topics: [
    {
      id: "python",
      name: "Python",
      icon: "Code",
      category: "Programming",
      description: "Python fundamentals, memory management, generators, decorators, APIs, and data structures for Data Engineers.",
      questions: [
        {
          id: "py-1",
          question: "How do Python generators optimize memory usage when processing huge 50GB CSV/JSON log files?",
          difficulty: "Medium",
          companyTags: ["Google", "Amazon", "Meta"],
          conceptExplanation: "Generators use lazy evaluation via the `yield` keyword. Instead of allocating memory for an entire dataset at once (which causes Out-Of-Memory exceptions), generators produce one item at a time on demand. This keeps RAM consumption constant at O(1) space complexity regardless of file size.",
          codeSnippet: {
            title: "Streaming 50GB File Line-by-Line with Generator",
            language: "python",
            code: "def stream_large_log(file_path):\n    with open(file_path, 'r', encoding='utf-8') as f:\n        for line in f:\n            if 'ERROR' in line:\n                yield line.strip()\n\n# Usage: Memory consumption stays under a few MBs!\nfor error_log in stream_large_log('/var/logs/huge_production.log'):\n    process_error(error_log)"
          }
        },
        {
          id: "py-2",
          question: "What is the Global Interpreter Lock (GIL) in Python and how does it impact multi-threading vs multi-processing in ETL?",
          difficulty: "Hard",
          companyTags: ["Uber", "Databricks", "Stripe"],
          conceptExplanation: "The GIL is a mutex lock in CPython preventing multiple native threads from executing Python bytecode simultaneously. For CPU-bound tasks (e.g. data transformation/parsing), multi-threading does not speed up execution due to the GIL; `multiprocessing` (which spawns separate process memories) should be used instead. For I/O-bound tasks (e.g. fetching 1,000 API endpoints or downloading S3 files), multi-threading (`concurrent.futures.ThreadPoolExecutor`) works efficiently as the GIL is released during I/O waits.",
          codeSnippet: {
            title: "Concurrent API Requests using ThreadPoolExecutor",
            language: "python",
            code: "from concurrent.futures import ThreadPoolExecutor\nimport requests\n\nurls = [f'https://api.example.com/data/{i}' for i in range(100)]\n\ndef fetch_url(url):\n    res = requests.get(url)\n    return res.json()\n\n# Fast parallel I/O execution\nwith ThreadPoolExecutor(max_workers=10) as executor:\n    results = list(executor.map(fetch_url, urls))"
          }
        },
        {
          id: "py-3",
          question: "Write a custom Python decorator that logs pipeline execution time and retries on transient network failures.",
          difficulty: "Hard",
          companyTags: ["Amazon", "Netflix", "Snowflake"],
          conceptExplanation: "Decorators wrap functions to extend behavior without modifying their code. Combining time measurement with exception handling enables resilient production ETL operations.",
          codeSnippet: {
            title: "Retry & Execution Time Logger Decorator",
            language: "python",
            code: "import time\nimport functools\n\ndef retry_and_time(retries=3, delay=2):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            start_time = time.time()\n            for attempt in range(1, retries + 1):\n                try:\n                    result = func(*args, **kwargs)\n                    elapsed = time.time() - start_time\n                    print(f'[{func.__name__}] Succeeded in {elapsed:.2f}s')\n                    return result\n                except Exception as e:\n                    print(f'[{func.__name__}] Attempt {attempt} failed: {e}')\n                    if attempt == retries:\n                        raise\n                    time.sleep(delay)\n        return wrapper\n    return decorator\n\n@retry_and_time(retries=3, delay=1)\ndef fetch_db_connection():\n    # Simulate network call\n    return 'Connected'"
          }
        }
      ]
    },
    {
      id: "sql",
      name: "SQL",
      icon: "Database",
      category: "Database",
      description: "Advanced SQL queries, Window Functions, Joins, CTEs, Indexing, Data Modeling, and Execution Plans.",
      questions: [
        {
          id: "sql-1",
          question: "What is the difference between RANK() and DENSE_RANK()? Write a query to find the 2nd highest salary per department.",
          difficulty: "Medium",
          companyTags: ["Amazon", "Google", "Databricks", "Meta"],
          conceptExplanation: "RANK() assigns rank integers but skips numbers after ties (e.g. 1, 2, 2, 4). DENSE_RANK() assigns consecutive rank integers without skipping numbers after ties (e.g. 1, 2, 2, 3). Use DENSE_RANK() whenever strict ordinal position (like 2nd highest) is required.",
          codeSnippet: {
            title: "2nd Highest Salary per Department using DENSE_RANK()",
            language: "sql",
            code: "WITH RankedSalaries AS (\n  SELECT \n    employee_id, \n    department_id, \n    salary,\n    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk\n  FROM employees\n)\nSELECT employee_id, department_id, salary\nFROM RankedSalaries\nWHERE rk = 2;"
          }
        },
        {
          id: "sql-2",
          question: "Explain Left Semi Join vs Inner Join vs Left Anti Join with example queries.",
          difficulty: "Hard",
          companyTags: ["Snowflake", "Databricks", "Amazon"],
          conceptExplanation: "An INNER JOIN returns matching rows from both tables, duplicating left rows if multiple right matches exist. A LEFT SEMI JOIN returns left table rows that match the right table, selecting ONLY left columns without duplicating left rows. A LEFT ANTI JOIN returns left table rows that have NO match in the right table (ideal for finding missing records).",
          codeSnippet: {
            title: "Left Semi Join vs Left Anti Join in SQL",
            language: "sql",
            code: "-- Left Semi Join: Find customers who have placed at least 1 order\nSELECT c.*\nFROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id\n);\n\n-- Left Anti Join: Find customers with ZERO orders\nSELECT c.*\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id\n);"
          }
        },
        {
          id: "sql-3",
          question: "How do you calculate a 7-day rolling average revenue in SQL using window frame clauses?",
          difficulty: "Medium",
          companyTags: ["Uber", "Apple", "Stripe"],
          conceptExplanation: "Use aggregate window functions with `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`. This includes the current row plus the 6 previous rows in the calculation window.",
          codeSnippet: {
            title: "7-Day Moving Average Revenue Query",
            language: "sql",
            code: "SELECT \n  order_date,\n  daily_revenue,\n  ROUND(\n    AVG(daily_revenue) OVER (\n      ORDER BY order_date \n      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    ), 2\n  ) AS 7_day_moving_avg\nFROM daily_sales_summary;"
          }
        }
      ]
    },
    {
      id: "python-etl",
      name: "Python ETL",
      icon: "Cpu",
      category: "ETL Engineering",
      description: "Building production Python ETL pipelines, Pandas transformations, SQLAlchemy, idempotency, chunking, and logging.",
      questions: [
        {
          id: "etl-1",
          question: "How do you build an idempotent Python ETL job that loads data without creating duplicate records on reruns?",
          difficulty: "Hard",
          companyTags: ["Meta", "Snowflake", "Amazon"],
          conceptExplanation: "Idempotency ensures that executing an ETL job multiple times for the same execution date produces the exact same output state without duplicate rows. Implement this by deleting existing destination records for the batch date before loading, using staging tables with MERGE INTO, or atomic SQL transaction blocks.",
          codeSnippet: {
            title: "Idempotent Batch Partition Load in Python",
            language: "python",
            code: "import psycopg2\n\ndef load_daily_batch_idempotent(df, batch_date, db_config):\n    conn = psycopg2.connect(**db_config)\n    cursor = conn.cursor()\n    try:\n        # Step 1: Delete existing records for batch date\n        cursor.execute(\"DELETE FROM fact_orders WHERE order_date = %s\", (batch_date,))\n        \n        # Step 2: Insert clean dataframe batch\n        tuples = [tuple(x) for x in df.to_numpy()]\n        cursor.executemany(\n            \"INSERT INTO fact_orders (order_id, customer_id, amount, order_date) VALUES (%s, %s, %s, %s)\",\n            tuples\n        )\n        conn.commit()\n        print(f\"Successfully loaded {len(df)} records for {batch_date}\")\n    except Exception as e:\n        conn.rollback()\n        raise e\n    finally:\n        conn.close()"
          }
        },
        {
          id: "etl-2",
          question: "How do you handle Pandas chunking for multi-gigabyte CSV files that exceed memory limits?",
          difficulty: "Medium",
          companyTags: ["Airbnb", "Capital One"],
          conceptExplanation: "Use `pd.read_csv(file_path, chunksize=100000)`. This returns an iterator yielding 100,000-row DataFrames sequentially, enabling chunk-by-chunk processing and direct database ingestion.",
          codeSnippet: {
            title: "Processing 10GB CSV in 100,000-Row Chunks",
            language: "python",
            code: "import pandas as pd\nfrom sqlalchemy import create_engine\n\nengine = create_engine('postgresql://user:pass@localhost:5432/analytics')\n\n# Read and process in 100k chunk batches\nfor i, chunk in enumerate(pd.read_csv('huge_sales.csv', chunksize=100000)):\n    # Transform chunk\n    chunk['amount_tax'] = chunk['amount'] * 1.08\n    # Load chunk\n    chunk.to_sql('fact_sales_staging', engine, if_exists='append', index=False)\n    print(f'Processed chunk batch #{i + 1}')"
          }
        }
      ]
    },
    {
      id: "aws",
      name: "AWS (S3, EC2, Glue, Athena)",
      icon: "Cloud",
      category: "AWS Cloud",
      description: "AWS S3 object storage, EC2 instance types, AWS Glue Data Catalog & Crawlers, and Serverless Athena SQL queries.",
      questions: [
        {
          id: "aws-1",
          question: "What is Amazon Athena, how does it price queries, and how do you optimize scan costs?",
          difficulty: "Hard",
          companyTags: ["AWS", "Amazon", "Fintech"],
          conceptExplanation: "Amazon Athena is an interactive serverless query engine that executes ANSI SQL directly against data stored in S3. Athena charges $5 per Terabyte (TB) of data scanned. Optimization strategies: (1) Convert raw CSV/JSON files to columnar Parquet or ORC format, (2) Partition data in S3 using date prefixes (e.g. s3://bucket/dataset/year=2025/month=06/), (3) Compress data with Snappy or ZSTD.",
          codeSnippet: {
            title: "Athena DDL for Partitioned Parquet Table",
            language: "sql",
            code: "CREATE EXTERNAL TABLE IF NOT EXISTS analytics_db.fact_events (\n  event_id STRING,\n  user_id INT,\n  event_name STRING\n)\nPARTITIONED BY (year STRING, month STRING)\nSTORED AS PARQUET\nLOCATION 's3://my-company-datalake/silver/events/'\nTBLPROPERTIES ('parquet.compress'='SNAPPY');"
          }
        },
        {
          id: "aws-2",
          question: "What is the difference between AWS Glue Crawlers, Data Catalog, and Glue PySpark ETL Jobs?",
          difficulty: "Hard",
          companyTags: ["AWS", "Capital One", "Walmart"],
          conceptExplanation: "AWS Glue Data Catalog is a centralized Apache Hive-compatible metadata store. AWS Glue Crawlers scan S3 data lakes, infer schema definitions, and register tables into the Data Catalog automatically. AWS Glue PySpark ETL Jobs run distributed Spark scripts serverlessly to transform raw S3 data into structured lakehouse datasets.",
          codeSnippet: {
            title: "AWS Glue PySpark Script reading from Catalog",
            language: "python",
            code: "import sys\nfrom awsglue.context import GlueContext\nfrom pyspark.context import SparkContext\n\nglueContext = GlueContext(SparkContext.getOrCreate())\n\n# Read from Glue Data Catalog table\ndynamic_frame = glueContext.create_dynamic_frame.from_catalog(\n    database=\"sales_db\",\n    table_name=\"raw_orders\"\n)\n\n# Convert to Spark DataFrame and transform\nspark_df = dynamic_frame.toDF().filter(\"status = 'COMPLETED'\")\nspark_df.write.mode(\"overwrite\").partitionBy(\"year\").parquet(\"s3://my-lake/silver/orders/\")"
          }
        },
        {
          id: "aws-3",
          question: "When would you choose EC2 Spot Instances versus On-Demand instances for big data workloads?",
          difficulty: "Medium",
          companyTags: ["AWS", "Stripe", "Uber"],
          conceptExplanation: "On-Demand instances provide guaranteed compute availability without interruption (ideal for database masters, API webservers, or NameNodes). Spot Instances offer up to 90% discount on unused EC2 capacity but can be reclaimed by AWS with a 2-minute warning. Spot instances are ideal for stateless, fault-tolerant, horizontally scalable workloads like EMR Task Nodes or PySpark batch processing jobs.",
          codeSnippet: {
            title: "AWS Boto3 EC2 Spot Request Configuration",
            language: "python",
            code: "import boto3\n\nec2_client = boto3.client('ec2')\n\nresponse = ec2_client.request_spot_instances(\n    SpotPrice='0.05',\n    InstanceCount=5,\n    LaunchSpecification={\n        'ImageId': 'ami-0abcdef1234567890',\n        'InstanceType': 'c5.2xlarge',\n        'KeyName': 'my-ssh-key'\n    }\n)"
          }
        }
      ]
    },
    {
      id: "pyspark",
      name: "PySpark",
      icon: "Zap",
      category: "Big Data Processing",
      description: "Spark Driver/Executors, DataFrames, Transformations vs Actions, Adaptive Query Execution (AQE), Salting data skew, and Broadcast joins.",
      questions: [
        {
          id: "pyspark-1",
          question: "What is Data Skew in PySpark, what symptoms does it cause, and how do you resolve it using Salting?",
          difficulty: "Hard",
          companyTags: ["Databricks", "Uber", "Apple", "Meta"],
          conceptExplanation: "Data Skew occurs when a join key or grouping key is unevenly distributed, causing 99% of data to land on a single executor task while other executors finish immediately. Symptoms: Spark job hangs at 99% progress or fails with Out-Of-Memory (OOM) error. Resolution: Salting adds a random integer suffix (0 to N-1) to the skewed key on the left table and explodes the right table to match all salt keys, spreading the skewed key evenly across partitions.",
          codeSnippet: {
            title: "PySpark Salting Strategy Implementation",
            language: "python",
            code: "from pyspark.sql.functions import concat, lit, expr, floor, rand\n\nSALT_FACTOR = 4\n# Salt skewed left DataFrame\nskewed_df = skewed_df.withColumn('salt', floor(rand() * SALT_FACTOR))\nskewed_df = skewed_df.withColumn('salted_key', concat('user_id', lit('_'), 'salt'))\n\n# Explode right lookup DataFrame\nlookup_df = lookup_df.withColumn('salt_array', expr('array(0, 1, 2, 3)'))\nlookup_df = lookup_df.select('*', expr('explode(salt_array) as salt'))\nlookup_df = lookup_df.withColumn('salted_key', concat('user_id', lit('_'), 'salt'))\n\n# Join on salted key without data skew!\nresult_df = skewed_df.join(lookup_df, 'salted_key', 'inner')"
          }
        },
        {
          id: "pyspark-2",
          question: "Explain Broadcast Hash Join vs Sort-Merge Join in PySpark.",
          difficulty: "Hard",
          companyTags: ["Databricks", "Amazon", "Netflix"],
          conceptExplanation: "Broadcast Hash Join broadcasts the small DataFrame (<10MB default) to all executor nodes, eliminating expensive network shuffling. Sort-Merge Join is the default strategy for large DataFrames: both DataFrames are shuffled across nodes based on join key hashes, sorted, and then merged.",
          codeSnippet: {
            title: "PySpark Broadcast Join Hint Syntax",
            language: "python",
            code: "from pyspark.sql.functions import broadcast\n\n# Force PySpark to broadcast small dim_store table\nfact_sales_df.join(\n    broadcast(dim_store_df),\n    on='store_id',\n    how='inner'\n).show()"
          }
        },
        {
          id: "pyspark-3",
          question: "What is the difference between cache() and persist() in PySpark?",
          difficulty: "Medium",
          companyTags: ["Databricks", "Google"],
          conceptExplanation: "df.cache() is a shorthand call for df.persist(StorageLevel.MEMORY_AND_DISK). df.persist(StorageLevel) allows you to specify custom storage levels like MEMORY_ONLY, DISK_ONLY, or serialized options (MEMORY_AND_DISK_SER).",
          codeSnippet: {
            title: "PySpark StorageLevel Persist Syntax",
            language: "python",
            code: "from pyspark import StorageLevel\n\n# Persist in memory serialized to reduce RAM usage\ndf.persist(StorageLevel.MEMORY_AND_DISK_SER)\nprint(f'Is cached: {df.is_cached}')"
          }
        }
      ]
    },
    {
      id: "hive",
      name: "Hive",
      icon: "Server",
      category: "Data Warehousing",
      description: "Hive Metastore, Managed vs External Tables, Partitioning vs Bucketing, ORC file format, and HiveQL performance tuning.",
      questions: [
        {
          id: "hive-1",
          question: "What is the difference between Hive Partitioning and Bucketing?",
          difficulty: "Hard",
          companyTags: ["Cloudera", "Amazon", "Walmart"],
          conceptExplanation: "Partitioning divides table data into separate subdirectories based on column values (e.g. country=US/year=2025). It is best for low-cardinality columns. Bucketing divides data within partitions into fixed N files based on a hash function of a column (`CLUSTERED BY (user_id) INTO 32 BUCKETS`). Bucketing is best for high-cardinality join keys and optimizes map-side joins.",
          codeSnippet: {
            title: "Creating Hive Partitioned and Bucketed Table",
            language: "sql",
            code: "CREATE EXTERNAL TABLE IF NOT EXISTS user_activity (\n  user_id BIGINT,\n  action STRING,\n  amount DOUBLE\n)\nPARTITIONED BY (dt STRING)\nCLUSTERED BY (user_id) INTO 16 BUCKETS\nSTORED AS ORC\nLOCATION 's3://my-datalake/hive/user_activity/';"
          }
        },
        {
          id: "hive-2",
          question: "What happens when you execute DROP TABLE on a Hive Managed Table versus External Table?",
          difficulty: "Medium",
          companyTags: ["Cloudera", "Hadoop Ecosystem"],
          conceptExplanation: "For Managed (Internal) tables, Hive owns both metadata in Hive Metastore and physical data files in S3/HDFS; dropping table deletes both metadata and physical files. For External tables, Hive owns metadata only; dropping table deletes Metastore schema metadata while leaving raw S3/HDFS files intact.",
          codeSnippet: {
            title: "Hive DDL for Managed vs External Table",
            language: "sql",
            code: "-- Managed Table\nCREATE TABLE internal_logs (id INT);\n\n-- External Table (Recommended for S3 Lakes)\nCREATE EXTERNAL TABLE external_logs (id INT)\nLOCATION 's3://my-datalake/logs/';"
          }
        }
      ]
    },
    {
      id: "hadoop",
      name: "Hadoop",
      icon: "Server",
      category: "Distributed Systems",
      description: "HDFS Architecture (NameNode, DataNode, 128MB Blocks), YARN (ResourceManager, NodeManager), and MapReduce phases.",
      questions: [
        {
          id: "hadoop-1",
          question: "Explain HDFS Architecture: NameNode, DataNode, Secondary NameNode, Block Size, and Replication Factor.",
          difficulty: "Medium",
          companyTags: ["Cloudera", "Yahoo", "Amazon"],
          conceptExplanation: "HDFS follows a Master-Worker architecture. The NameNode (Master) manages file system namespace metadata, directory trees, and block locations in RAM. DataNodes (Workers) store 128MB data blocks on physical disk and send periodic Heartbeats and Block Reports to NameNode. Default replication factor is 3 (1 local rack node, 1 different node same rack, 1 different rack node). Secondary NameNode creates checkpoints of the fsimage and edits log to assist NameNode restart.",
          codeSnippet: {
            title: "Essential HDFS CLI Commands",
            language: "bash",
            code: "# Check HDFS cluster health and block replication\nhdfs fsck / -files -blocks -locations\n\n# Create directory and copy file to HDFS\nhdfs dfs -mkdir -p /data/raw/\nhdfs dfs -put local_dataset.csv /data/raw/"
          }
        },
        {
          id: "hadoop-2",
          question: "What are the core components of YARN architecture and how does container allocation work?",
          difficulty: "Hard",
          companyTags: ["Cloudera", "Apache"],
          conceptExplanation: "YARN (Yet Another Resource Navigator) decouples resource management from processing. Key components: (1) ResourceManager (Master) allocates CPU and RAM across cluster, (2) NodeManager (Worker agent) launches and monitors resource Containers, (3) ApplicationMaster (Per-job coordinator) negotiates containers from ResourceManager and runs tasks.",
          codeSnippet: {
            title: "YARN CLI Monitoring Commands",
            language: "bash",
            code: "# List running YARN applications\nyarn application -list\n\n# Check application log for specific application ID\nyarn logs -applicationId application_1678900000_0001"
          }
        }
      ]
    },
    {
      id: "snowflake",
      name: "Snowflake",
      icon: "Snowflake",
      category: "Cloud Data Warehouse",
      description: "Snowflake 3-Layer Architecture, Micro-partitions, Virtual Warehouses, Zero-Copy Cloning, Time Travel, and Snowpipe.",
      questions: [
        {
          id: "snowflake-1",
          question: "Explain Snowflake 3-Layer Architecture: Database Storage, Query Processing (Virtual Warehouses), and Cloud Services.",
          difficulty: "Medium",
          companyTags: ["Snowflake", "Capital One", "Cisco"],
          conceptExplanation: "Snowflake decouples storage, compute, and management. (1) Database Storage Layer stores data in compressed, encrypted, immutable 50MB-150MB micro-partitions in S3/Blob. (2) Query Processing Layer consists of independent MPP Virtual Warehouses (XS to 4XL) ensuring zero resource contention between workloads. (3) Cloud Services Layer coordinates authentication, metadata management, micro-partition pruning stats, and query optimization.",
          codeSnippet: {
            title: "Zero-Copy Clone & Time Travel Query in Snowflake",
            language: "sql",
            code: "-- Query orders table as it existed 3 hours ago\nSELECT * FROM orders AT(OFFSET => -10800);\n\n-- Create instant zero-copy clone of production database for QA\nCREATE DATABASE qa_analytics CLONE prod_analytics;"
          }
        },
        {
          id: "snowflake-2",
          question: "What are Micro-partitions in Snowflake and how does metadata pruning eliminate full table scans?",
          difficulty: "Hard",
          companyTags: ["Snowflake", "DoorDash"],
          conceptExplanation: "Snowflake automatically divides tables into continuous 50MB-150MB compressed columnar micro-partitions. The Cloud Services layer maintains metadata containing min/max values for every column inside each micro-partition. When a SQL query contains a WHERE clause, Snowflake compares filter predicates against micro-partition metadata, completely skipping non-matching micro-partitions without scanning storage files.",
          codeSnippet: {
            title: "Snowflake Clustering Depth Check",
            language: "sql",
            code: "-- Check clustering efficiency of a large table\nSELECT SYSTEM$CLUSTERING_INFORMATION('fact_sales', '(order_date, region)');"
          }
        }
      ]
    },
    {
      id: "dbt",
      name: "dbt",
      icon: "Layers",
      category: "Data Transformation",
      description: "dbt Core, Staging → Intermediate → Marts modeling layer, Materializations (View, Table, Incremental), Jinja, and dbt tests.",
      questions: [
        {
          id: "dbt-1",
          question: "What are dbt Materializations (View, Table, Incremental, Ephemeral) and when should you use Incremental models?",
          difficulty: "Hard",
          companyTags: ["dbt Labs", "Snowflake", "Databricks"],
          conceptExplanation: "dbt materializations govern how SQL models are created in target warehouses. View: Recreates view on every execution. Table: Drops and recreates full table. Ephemeral: Interpolates model as CTE in downstream models without creating warehouse objects. Incremental: Transforms and loads only new/updated records since last execution using MERGE INTO matching on `unique_key`.",
          codeSnippet: {
            title: "Incremental dbt Model Pattern with Jinja Filter",
            language: "sql",
            code: "{{ config(\n    materialized='incremental',\n    unique_key='order_id'\n) }}\n\nSELECT \n  order_id,\n  customer_id,\n  amount,\n  updated_at\nFROM {{ ref('stg_orders') }}\n\n{% if is_incremental() %}\n  -- Load only rows updated since last execution\n  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})\n{% endif %}"
          }
        },
        {
          id: "dbt-2",
          question: "How do you implement Data Quality Testing in dbt (Generic Schema Tests vs Singular Custom Tests)?",
          difficulty: "Medium",
          companyTags: ["dbt Labs", "DoorDash", "Stripe"],
          conceptExplanation: "dbt provides 4 out-of-the-box generic schema tests: `unique`, `not_null`, `accepted_values`, and `relationships` defined in `schema.yml`. Singular tests are custom SQL scripts in the `tests/` directory that return failing rows if data quality rules are violated.",
          codeSnippet: {
            title: "dbt schema.yml Data Quality Test Configuration",
            language: "yaml",
            code: "version: 2\nmodels:\n  - name: fct_orders\n    columns:\n      - name: order_id\n        tests:\n          - unique\n          - not_null\n      - name: status\n        tests:\n          - accepted_values:\n              values: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED']"
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(outDir, 'interview_questions_db.json'), JSON.stringify(interviewDB, null, 2));
console.log('Successfully generated interview_questions_db.json with 9 core topics!');
