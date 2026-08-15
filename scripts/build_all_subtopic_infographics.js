import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../src/data/interview_questions_db.json');
const outPath = path.join(__dirname, '../src/data/infographic_topics_db.json');

const rawDB = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const infographicData = {};

rawDB.topics.forEach((topic) => {
  // Topic-level default overview
  const topicObj = {
    id: topic.id,
    title: `What is ${topic.name} in Data Engineering?`,
    subtitle: topic.description || `${topic.name} is a core technology used in data engineering pipelines to extract, transform, clean, and load large scale datasets.`,
    whyList: [
      `Essential for ${topic.name} data pipeline development`,
      "Scalable production performance",
      "Industry standard across enterprise cloud data lakes",
      "Seamless integration with Airflow & Data Warehouses",
      "High efficiency for batch & real-time streaming"
    ],
    whereUsed: [
      { title: "Data Engineering", desc: `${topic.name} data pipelines & ETL automation` },
      { title: "Data Analytics", desc: `Reporting & business metrics using ${topic.name}` },
      { title: "Cloud Integration", desc: "AWS, Snowflake, Databricks & BigQuery workflows" },
      { title: "Data Quality", desc: "Automated schema validation & data integrity" },
      { title: "Ad-Hoc Querying", desc: "Fast analytical query execution" }
    ],
    howItWorks: [
      { step: `1. Ingest Data`, desc: `Reads source data files into ${topic.name} engine` },
      { step: `2. Query Optimizer`, desc: "Compiles execution plan & optimizes joins" },
      { step: `3. Parallel Execution`, desc: "Processes partitions in parallel memory RAM" },
      { step: `4. Load Output`, desc: "Writes results to S3, Postgres or Snowflake" }
    ],
    whenToUse: [
      `When processing ${topic.name} data transformations`,
      "When building production ETL/ELT pipelines",
      "When optimizing data warehouse query speed",
      "When standardizing analytics data modeling"
    ],
    coreConcepts: topic.subtopics.map(sub => ({
      concept: sub.name,
      desc: `Core concepts and practical implementation pattern for ${sub.name}.`
    })),
    basicCode: topic.questions[0]?.codeSnippet?.code || `# Sample ${topic.name} Code\nprint("Executing ${topic.name} pipeline")`,
    advancedCode: topic.questions[1]?.codeSnippet?.code || topic.questions[0]?.codeSnippet?.code || `# Advanced ${topic.name} Pipeline\nprocess_batch()`,
    platforms: ["AWS Cloud", "Databricks", "Snowflake", "Local Environment"],
    summary: `${topic.name} = Core Data Engineering Pillar. Essential mastery for interview success.`,
    subtopicDetails: {}
  };

  // Populate subtopic-specific infographic data for EVERY SINGLE SUBTOPIC!
  topic.subtopics.forEach((sub) => {
    const subQuestions = topic.questions.filter(q => q.subtopicId === sub.id);
    const firstQ = subQuestions[0] || topic.questions[0];

    topicObj.subtopicDetails[sub.id] = {
      title: `${topic.name}: ${sub.name}`,
      subtitle: firstQ ? firstQ.question : `Deep dive into ${sub.name} for ${topic.name} data engineering pipelines.`,
      whyList: [
        `Mastering ${sub.name} is a key requirement in data engineering technical interviews`,
        `Solves real-world production performance bottlenecks in ${topic.name}`,
        "Prevents system failures, memory crashes, and invalid data joins",
        "Used daily in production Airflow DAGs & Data Warehouse pipelines"
      ],
      codeSnippet: firstQ && firstQ.codeSnippet ? firstQ.codeSnippet.code : `# ${sub.name} Example\nprint("Executing ${sub.name}")`,
      explanation: firstQ ? firstQ.conceptExplanation : `Comprehensive explanation for ${sub.name}.`
    };
  });

  infographicData[topic.id] = topicObj;
});

fs.writeFileSync(outPath, JSON.stringify(infographicData, null, 2));
console.log(`Successfully generated dynamic subtopic infographic database for ${Object.keys(infographicData).length} topics!`);
