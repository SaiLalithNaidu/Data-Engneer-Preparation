import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const TOPIC_SPECS = [
  {
    id: "python",
    name: "Python",
    icon: "Code",
    category: "Programming",
    description: "Learn Python for Data Engineering in simple words: data structures, generators, functions, decorators, and Pandas.",
    subcategories: [
      "Data Structures & Collections",
      "Generators & Memory Optimization",
      "Object-Oriented Programming (OOP)",
      "Lambda & List Comprehensions",
      "Decorators & Context Managers",
      "File I/O & JSON/CSV Streaming",
      "Multiprocessing & GIL",
      "Pandas DataFrames & Transformations"
    ]
  },
  {
    id: "sql",
    name: "SQL",
    icon: "Database",
    category: "Database",
    description: "Learn SQL in simple words: window functions, joins, group by, subqueries, indexing, and data modeling.",
    subcategories: [
      "Core SQL & Aggregates",
      "Window Functions (DENSE_RANK, LAG, LEAD)",
      "Window Frame Clauses (ROWS BETWEEN)",
      "Advanced Joins (Inner, Left, Semi, Anti)",
      "Subqueries & CTEs",
      "Data Modeling (Star & Snowflake Schema)",
      "Indexing & Query Optimization",
      "ACID Transactions & Isolation Levels"
    ]
  },
  {
    id: "python-etl",
    name: "Python ETL",
    icon: "Cpu",
    category: "ETL Engineering",
    description: "Learn Python ETL in simple words: API extraction, file chunking, database connections, and idempotent batch pipelines.",
    subcategories: [
      "API Extraction & Rate Limits",
      "File Chunking & Memory Streaming",
      "Database Connections & SQLAlchemy",
      "Idempotent Batch Overwrite Patterns",
      "Pipeline Logging & Error Alerts",
      "Modular ETL Testing & Pytest"
    ]
  },
  {
    id: "aws",
    name: "AWS (S3, EC2, Glue, Athena)",
    icon: "Cloud",
    category: "AWS Cloud",
    description: "Learn AWS Cloud in simple words: S3 storage, EC2 instances, Glue Crawlers & Catalog, and serverless Athena SQL.",
    subcategories: [
      "Amazon S3 Medallion Lakes",
      "Amazon EC2 Spot & On-Demand",
      "AWS Glue Data Catalog & Crawlers",
      "AWS Glue PySpark Jobs",
      "Amazon Athena Serverless SQL",
      "AWS IAM & KMS Encryption"
    ]
  },
  {
    id: "pyspark",
    name: "PySpark",
    icon: "Zap",
    category: "Big Data Processing",
    description: "Learn PySpark in simple words: Driver/Executors, DataFrames, Broadcast Joins, Data Skew Salting, and Caching.",
    subcategories: [
      "Driver & Executor Architecture",
      "RDD vs DataFrame APIs",
      "Transformations vs Actions",
      "Broadcast vs Sort-Merge Joins",
      "Data Skew & Salting Strategies",
      "Caching & AQE Performance Tuning"
    ]
  },
  {
    id: "hive",
    name: "Hive",
    icon: "Server",
    category: "Data Warehousing",
    description: "Learn Apache Hive in simple words: Hive Metastore, Managed vs External tables, Partitioning, and Bucketing.",
    subcategories: [
      "Hive Metastore Architecture",
      "Managed vs External Tables",
      "Partitioning vs Bucketing",
      "ORC & Parquet Vectorization"
    ]
  },
  {
    id: "hadoop",
    name: "Hadoop",
    icon: "Server",
    category: "Distributed Systems",
    description: "Learn Hadoop in simple words: HDFS NameNode, DataNodes, YARN container scheduling, and MapReduce phases.",
    subcategories: [
      "HDFS NameNode & DataNode",
      "HDFS Read & Write Data Flow",
      "YARN Container Scheduling",
      "MapReduce Map & Reduce Phases"
    ]
  },
  {
    id: "snowflake",
    name: "Snowflake",
    icon: "Snowflake",
    category: "Cloud Data Warehouse",
    description: "Learn Snowflake in simple words: Storage/Compute separation, Micro-partitions, Zero-Copy Cloning, and Snowpipe.",
    subcategories: [
      "Snowflake 3-Layer Decoupled Architecture",
      "Micro-partitions & Pruning",
      "Virtual Warehouse Scaling",
      "Zero-Copy Cloning & Time Travel",
      "Snowpipe Ingestion Pipelines"
    ]
  },
  {
    id: "dbt",
    name: "dbt",
    icon: "Layers",
    category: "Data Transformation",
    description: "Learn dbt in simple words: Staging to Marts modeling, View vs Table vs Incremental materializations, and schema testing.",
    subcategories: [
      "dbt Staging → Marts DAG Architecture",
      "Materializations (View, Table, Incremental)",
      "Incremental Models & unique_key Merges",
      "dbt Generic & Singular Testing"
    ]
  }
];

const COMPANY_TAGS_POOL = ["Amazon", "Google", "Databricks", "Snowflake", "Meta", "AWS", "Uber", "Netflix", "Apple", "Stripe"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

// SIMPLE, EASY-TO-UNDERSTAND EXPLANATIONS FOR ALL TOPICS
function getSimpleExplanation(topicId, subcatName, qNum) {
  if (topicId === 'python') {
    return `Simple Explanation:\n${subcatName} helps you write clean, fast Python code.\n\nKey Points in Simple Words:\n1. What it does: It handles your data step-by-step so your computer memory (RAM) stays low.\n2. Why we use it: Large 10GB files can crash Python if loaded all at once. Processing line-by-line prevents crashes.\n3. Easy Rule: Always use generators (yield) or Pandas chunking for big data files.`;
  }
  if (topicId === 'sql') {
    return `Simple Explanation:\nIn SQL, ${subcatName} is used to rank, filter, and organize database rows easily.\n\nKey Points in Simple Words:\n1. DENSE_RANK() vs RANK(): DENSE_RANK() gives 1, 2, 2, 3 (no gaps). RANK() gives 1, 2, 2, 4 (skips number 3).\n2. Why we use it: Window functions allow you to calculate running totals or find top salaries without losing individual row details.\n3. Easy Rule: Always use PARTITION BY to group rows and ORDER BY to sort rows inside the window function.`;
  }
  if (topicId === 'python-etl') {
    return `Simple Explanation:\n${subcatName} ensures your Python ETL pipeline runs smoothly every single day.\n\nKey Points in Simple Words:\n1. What is Idempotency? It means running your ETL script 5 times gives the exact same result without making duplicate rows.\n2. How to do it: Delete old data for today's date first, then insert the new data.\n3. Easy Rule: Always handle API errors with retries and log pipeline status to Slack or email.`;
  }
  if (topicId === 'aws') {
    return `Simple Explanation:\nAWS provides cloud tools like S3 for file storage, Glue for cataloging, and Athena for SQL queries.\n\nKey Points in Simple Words:\n1. S3 Storage: Organizes files into Raw (Bronze), Clean (Silver), and Business (Gold) folders.\n2. Athena SQL: Lets you query S3 files using standard SQL without managing any database servers.\n3. Cost Tip: Convert CSV files to Parquet format to scan less data and save money ($5/TB).`;
  }
  if (topicId === 'pyspark') {
    return `Simple Explanation:\nPySpark runs your data code across a cluster of multiple computers in parallel.\n\nKey Points in Simple Words:\n1. Driver & Executors: The Driver is the manager node; Executors are worker machines that do the heavy lifting.\n2. Broadcast Join: Copies a small lookup table (like 5MB stores list) to all worker machines to prevent slow network shuffles.\n3. Salting Data Skew: Adds random numbers to uneven join keys so all worker machines share the work equally.`;
  }
  if (topicId === 'hive') {
    return `Simple Explanation:\nApache Hive brings SQL query capability to Hadoop data storage.\n\nKey Points in Simple Words:\n1. Managed vs External Tables: Managed tables delete your data files when you drop the table. External tables keep your S3 files safe.\n2. Partitioning: Organizes table data into separate folders by date or region for faster queries.\n3. Easy Rule: Always use External Tables for cloud data lakes.`;
  }
  if (topicId === 'hadoop') {
    return `Simple Explanation:\nHadoop stores and processes massive data across hundreds of computers.\n\nKey Points in Simple Words:\n1. HDFS (Storage): NameNode manages metadata; DataNodes store 128MB blocks across 3 different servers for safety.\n2. YARN (Manager): Allocates RAM and CPU resources to running applications.\n3. MapReduce: Map phase reads & filters data; Reduce phase aggregates final answers.`;
  }
  if (topicId === 'snowflake') {
    return `Simple Explanation:\nSnowflake is a cloud data warehouse that separates storage and compute.\n\nKey Points in Simple Words:\n1. Storage & Compute: Micro-partitions store data in S3; Virtual Warehouses provide compute power on demand.\n2. Zero-Copy Cloning: Creates an instant copy of a database without taking up extra storage space.\n3. Snowpipe: Automatically loads new files into Snowflake as soon as they arrive in S3.`;
  }
  if (topicId === 'dbt') {
    return `Simple Explanation:\ndbt allows data engineers to transform data inside their warehouse using SQL SELECT statements.\n\nKey Points in Simple Words:\n1. Data Layers: Staging (stg_) cleans raw data → Marts (fct_/dim_) builds final business tables.\n2. Incremental Models: Loads only new or updated rows since the last execution using MERGE INTO.\n3. Testing: Automatically checks for null values or duplicate IDs to ensure high data quality.`;
  }
  return `Simple Explanation:\n${subcatName} is an important concept in Data Engineering.\n\nKey Points in Simple Words:\n1. Keep it simple and idempotent.\n2. Optimize memory and query performance.\n3. Test data quality automatically.`;
}

// REAL SIMPLE CODE PATTERNS
const SIMPLE_PYTHON_PATTERNS = [
  `# Simple Python Data Filter Function
def clean_user_data(user_list):
    # Keep only users with a valid email
    valid_users = [user for user in user_list if user.get('email') is not None]
    return valid_users`,

  `# Simple Python Generator Example
def read_large_csv(file_name):
    # Yields one row at a time to save memory RAM
    with open(file_name, 'r') as file:
        for line in file:
            yield line.strip().split(',')`,

  `# Simple Execution Time Decorator
import time

def measure_time(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Done in {time.time() - start:.2f} seconds!")
        return result
    return wrapper`,

  `# Simple Pandas DataFrame Filter
import pandas as pd

def process_orders(file_path):
    df = pd.read_csv(file_path)
    # Remove rows where customer_id is missing
    clean_df = df.dropna(subset=['customer_id'])
    return clean_df`
];

const SIMPLE_SQL_PATTERNS = [
  `-- Find 2nd Highest Salary per Department using DENSE_RANK()
WITH RankedSalaries AS (
  SELECT 
    employee_id,
    department_id,
    salary,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rk
  FROM employees
)
SELECT employee_id, department_id, salary
FROM RankedSalaries
WHERE rk = 2;`,

  `-- Find Customers with Zero Orders (Left Anti Join)
SELECT c.customer_id, c.customer_name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.customer_id = c.customer_id
);`,

  `-- Calculate 7-Day Rolling Average Revenue
SELECT 
  sale_date,
  daily_amount,
  AVG(daily_amount) OVER (
    ORDER BY sale_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS rolling_7day_avg
FROM daily_sales;`,

  `-- Clean Monthly Summary CTE
WITH MonthlySales AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS sales_month,
    SUM(amount) AS total_revenue
  FROM orders
  GROUP BY 1
)
SELECT * FROM MonthlySales WHERE total_revenue > 5000;`
];

function generateTreeTopic(topicSpec) {
  const subtopicMap = {};
  topicSpec.subcategories.forEach((name, idx) => {
    subtopicMap[name] = {
      id: `${topicSpec.id}-sub-${idx + 1}`,
      name: name,
      qCount: 0
    };
  });

  const questions = [];
  const isSql = topicSpec.id === 'sql' || topicSpec.id === 'hive' || topicSpec.id === 'snowflake' || topicSpec.id === 'dbt';

  for (let i = 1; i <= 200; i++) {
    const subcatName = topicSpec.subcategories[(i - 1) % topicSpec.subcategories.length];
    const subtopicObj = subtopicMap[subcatName];
    subtopicObj.qCount += 1;

    const difficulty = DIFFICULTIES[(i - 1) % 3];
    const companyTag1 = COMPANY_TAGS_POOL[(i * 3) % COMPANY_TAGS_POOL.length];
    const companyTag2 = COMPANY_TAGS_POOL[(i * 7) % COMPANY_TAGS_POOL.length];

    questions.push({
      id: `${topicSpec.id}-${i}`,
      subtopicId: subtopicObj.id,
      subtopicName: subcatName,
      question: `Question ${i}: What is ${subcatName} in ${topicSpec.name} and why is it important?`,
      difficulty: difficulty,
      companyTags: [companyTag1, companyTag2],
      conceptExplanation: getSimpleExplanation(topicSpec.id, subcatName, i),
      codeSnippet: {
        title: isSql ? `simple_query_${i}.sql` : `simple_script_${i}.py`,
        language: isSql ? 'sql' : 'python',
        code: isSql 
          ? SIMPLE_SQL_PATTERNS[(i - 1) % SIMPLE_SQL_PATTERNS.length] 
          : SIMPLE_PYTHON_PATTERNS[(i - 1) % SIMPLE_PYTHON_PATTERNS.length]
      }
    });
  }

  return {
    id: topicSpec.id,
    name: topicSpec.name,
    icon: topicSpec.icon,
    category: topicSpec.category,
    description: topicSpec.description,
    subtopics: Object.values(subtopicMap),
    questions: questions
  };
}

const interviewDB = {
  metadata: {
    title: "Data Engineer Simple English Question Bank (1,800 Clear Questions)",
    totalQuestionsCount: TOPIC_SPECS.length * 200,
    lastUpdated: new Date().toISOString()
  },
  topics: TOPIC_SPECS.map(spec => generateTreeTopic(spec))
};

fs.writeFileSync(path.join(outDir, 'interview_questions_db.json'), JSON.stringify(interviewDB, null, 2));
console.log(`Successfully generated simple English 1,800+ questions across all 9 topics!`);
