import React, { useState } from 'react';
import { X, FileText, Download, ExternalLink, Search, Sparkles } from 'lucide-react';

const SOURCE_FILES = [
  { name: '3 step interview guide for databricks & pyspark.pdf', size: '4.2 MB', category: 'Databricks / PySpark', pages: 16 },
  { name: 'ACID_IN_SQL_1747878834.pdf', size: '116 KB', category: 'SQL / Databases', pages: 5 },
  { name: 'Apache_Airflow_Zero_to_Hero__1767788932.pdf', size: '5.3 MB', category: 'Airflow / Orchestration', pages: 89 },
  { name: 'AWS_Interview_qus.pdf', size: '5.8 MB', category: 'AWS Cloud DE', pages: 68 },
  { name: 'Data Engineering -  SNOWFLAKE Concepts.pdf', size: '366 KB', category: 'Snowflake', pages: 93 },
  { name: 'Data Engineering Architecture .pdf', size: '945 KB', category: 'Architecture', pages: 34 },
  { name: 'Data Engineering Snowflake.pdf', size: '26.3 MB', category: 'Snowflake', pages: 93 },
  { name: 'Data_Engineering_Challenges.pdf', size: '5.4 KB', category: 'Architecture', pages: 3 },
  { name: 'hadoop_spark_deployment_guide.docx', size: '21.7 KB', category: 'Hadoop / Spark', pages: 'Docx' },
  { name: 'pyspark.pdf', size: '355 KB', category: 'PySpark', pages: 6 },
  { name: 'SCD_Slowly_Changing_Dimension_Concepts.pdf', size: '3.3 KB', category: 'Data Warehousing', pages: 2 },
  { name: 'snowflake.pdf', size: '253 KB', category: 'Snowflake', pages: 14 },
  { name: 'Spark 4.0.pdf', size: '2.0 MB', category: 'Spark 4.0', pages: 23 },
  { name: 'SQL Tutorial.pdf', size: '2.4 MB', category: 'SQL', pages: 200 },
  { name: 'SQL-Manual.pdf', size: '6.0 MB', category: 'SQL', pages: 119 },
  { name: 'SQL_PySpark_Joins_StudyNotes.pdf', size: '5.5 KB', category: 'SQL / PySpark', pages: 3 },
  { name: 'WINDOW_FUNCTIONS.pdf', size: '217 KB', category: 'SQL', pages: 6 },
  { name: '_Git_and_Github_Datasheet_1678988290.pdf', size: '386 KB', category: 'DevOps / Git', pages: 14 },
];

export default function PdfViewerModal({ isOpen, onClose }) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(SOURCE_FILES[0]);

  if (!isOpen) return null;

  const filtered = SOURCE_FILES.filter(f => 
    f.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      
      <div className="glass-panel w-full max-w-5xl h-[85vh] rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
                Source Document Library ({SOURCE_FILES.length} Files)
              </h2>
              <p className="text-xs text-slate-400">View original PDF & Word study materials in your workspace</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: Left File Browser, Right Preview / Action */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* File Selector List */}
          <div className="w-full md:w-80 border-r border-slate-800 p-4 space-y-3 flex flex-col bg-slate-950/50">
            
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search PDF documents..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 pl-8 pr-3 py-1.5 rounded-lg border border-slate-800 text-xs"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filtered.map((file) => {
                const isSelected = selectedFile.name === file.name;
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected 
                        ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-200 font-semibold' 
                        : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full">
                        {file.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{file.size}</span>
                    </div>
                    <div className="font-semibold text-slate-200 truncate">{file.name}</div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Embed / View Details */}
          <div className="hidden md:flex flex-1 flex-col p-6 space-y-4 bg-slate-900/30 overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
                  {selectedFile.category}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-2 font-heading">{selectedFile.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Size: {selectedFile.size} • Pages/Format: {selectedFile.pages}</p>
              </div>

              <a
                href={`/Concepts and materials/${encodeURIComponent(selectedFile.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                <ExternalLink className="w-4 h-4" /> Open Original File
              </a>
            </div>

            {/* Embedded PDF Viewer iFrame */}
            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[400px]">
              <iframe
                src={`/Concepts and materials/${encodeURIComponent(selectedFile.name)}`}
                className="w-full h-full border-0"
                title={selectedFile.name}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
