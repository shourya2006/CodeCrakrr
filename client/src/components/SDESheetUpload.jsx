import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import HeaderBar from './HeaderBar';

const SDESheetUpload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  
  const iconOptions = [
    { icon: 'fa-solid fa-layer-group', label: 'Layers' },
    { icon: 'fa-solid fa-code', label: 'Code' },
    { icon: 'fa-solid fa-list-check', label: 'List' },
    { icon: 'fa-solid fa-star', label: 'Star' },
    { icon: 'fa-solid fa-chart-column', label: 'Chart' },
    { icon: 'fa-solid fa-diagram-project', label: 'Diagram' },
    { icon: 'fa-solid fa-laptop-code', label: 'Laptop' },
    { icon: 'fa-solid fa-briefcase', label: 'Briefcase' },
    { icon: 'fa-solid fa-eye-low-vision', label: 'Eye' }
  ];
  
  const colorOptions = [
    { color: 'from-blue-500 to-indigo-600', bgLight: 'bg-blue-50', label: 'Blue' },
    { color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', label: 'Green' },
    { color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', label: 'Purple' },
    { color: 'from-red-500 to-red-600', bgLight: 'bg-red-50', label: 'Red' },
    { color: 'from-yellow-500 to-amber-600', bgLight: 'bg-yellow-50', label: 'Yellow' },
    { color: 'from-teal-500 to-teal-600', bgLight: 'bg-teal-50', label: 'Teal' },
    { color: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-50', label: 'Orange' },
    { color: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-50', label: 'Cyan' },
    { color: 'from-pink-500 to-pink-600', bgLight: 'bg-pink-50', label: 'Pink' }
  ];
  
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].color);
  const [selectedBgLight, setSelectedBgLight] = useState(colorOptions[0].bgLight);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(fileExt)) {
      setError('Please upload an Excel file (.xlsx, .xls) or CSV file');
      return;
    }
    
    setError('');
    setFile(selectedFile);
    setFileName(selectedFile.name);
    
    try {

      const arrayBuffer = await selectedFile.arrayBuffer();
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      
      if (jsonData.length < 2) {
        setError('Excel file must contain at least a header row and one data row');
        return;
      }
      
      const header = jsonData[0];
      
      const previewData = {
        totalProblems: jsonData.length - 1,
        difficulties: {},
        sections: []
      };
      
      const headerMap = {};
      header.forEach((col, index) => {
        if (typeof col === 'string') {
          headerMap[col.toLowerCase()] = index;
        }
      });
      
      const difficultyIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase().includes('difficult') || 
          cell.toLowerCase() === 'level'
        )
      );
      
      const sectionIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase() === 'section' || 
          cell.toLowerCase() === 'category' || 
          cell.toLowerCase() === 'topic'
        )
      );
      
      const hyperlinks = {};
      Object.keys(worksheet).forEach(cell => {
        if (worksheet[cell].l) { 
          const cellRef = cell.replace(/[0-9]/g, ''); 
          const rowIndex = parseInt(cell.replace(/[^0-9]/g, '')) - 1; 
          const colIndex = header.findIndex((_, i) => 
            XLSX.utils.encode_col(i) === cellRef
          );
          
          if (colIndex !== -1 && rowIndex > 0) {
            if (!hyperlinks[rowIndex]) hyperlinks[rowIndex] = {};
            hyperlinks[rowIndex][colIndex] = worksheet[cell].l.Target || worksheet[cell].l.target;
          }
        }
      });
      
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        
        if (!row || row.every(cell => !cell)) {
          continue;
        }
        
        const difficulty = difficultyIndex !== -1 ? row[difficultyIndex] || 'Unknown' : 'Unknown';
        
        if (difficulty) {
          previewData.difficulties[difficulty] = (previewData.difficulties[difficulty] || 0) + 1;
        }
        
        if (sectionIndex !== -1) {
          const section = row[sectionIndex] || 'General';
          
          let sectionObj = previewData.sections.find(s => s.name === section);
          if (!sectionObj) {
            sectionObj = { name: section, count: 0 };
            previewData.sections.push(sectionObj);
          }
          
          sectionObj.count++;
        }
      }
      
      previewData.sections.sort((a, b) => b.count - a.count);
      
      setPreview(previewData);
      
    } catch (error) {
      console.error('Error reading Excel file:', error);
      setError('Error reading Excel file. Please make sure it\'s a valid Excel or CSV file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title) {
      setError('Title is required');
      return;
    }
    
    if (!file) {
      setError('Please upload an Excel file');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
      
      if (jsonData.length < 2) {
        throw new Error('Excel file must contain at least a header row and one data row');
      }
      
      const header = jsonData[0];
      
      const headerMap = {};
      header.forEach((col, index) => {
        if (typeof col === 'string') {
          headerMap[col.toLowerCase()] = index;
        }
      });
      
      const problemIndex = headerMap['problem'] !== undefined ? 
        headerMap['problem'] : 
        header.findIndex(cell => typeof cell === 'string' && 
          (cell.toLowerCase().includes('problem') || 
           cell.toLowerCase().includes('question') || 
           cell.toLowerCase().includes('name'))) !== -1 ?
            header.findIndex(cell => typeof cell === 'string' && 
              (cell.toLowerCase().includes('problem') || 
               cell.toLowerCase().includes('question') || 
               cell.toLowerCase().includes('name'))) :
            0; // Default to first column
      
      const difficultyIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase().includes('difficult') || 
          cell.toLowerCase() === 'level'
        )
      );
      
      const linkIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase().includes('link') || 
          cell.toLowerCase().includes('url')
        )
      );
      
      const sectionIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase() === 'section' || 
          cell.toLowerCase() === 'category' || 
          cell.toLowerCase() === 'group'
        )
      );
      
      const topicIndex = header.findIndex(cell => 
        typeof cell === 'string' && (
          cell.toLowerCase() === 'topic' || 
          cell.toLowerCase() === 'tag' || 
          cell.toLowerCase() === 'type'
        )
      );
      
      const hyperlinks = {};
      Object.keys(worksheet).forEach(cell => {
        if (worksheet[cell].l) { 
          const cellRef = cell.replace(/[0-9]/g, ''); 
          const rowIndex = parseInt(cell.replace(/[^0-9]/g, '')) - 1; 
          const colIndex = header.findIndex((_, i) => 
            XLSX.utils.encode_col(i) === cellRef
          );
          
          if (colIndex !== -1 && rowIndex > 0) {
            if (!hyperlinks[rowIndex]) hyperlinks[rowIndex] = {};
            hyperlinks[rowIndex][colIndex] = worksheet[cell].l.Target || worksheet[cell].l.target;
          }
        }
      });
      
      const sectionMap = {};
      
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        
        if (!row || row.every(cell => !cell)) {
          continue;
        }
        
        let problemLink = linkIndex !== -1 ? row[linkIndex] || '#' : '#';
        
        if (hyperlinks[i] && hyperlinks[i][problemIndex]) {
          problemLink = hyperlinks[i][problemIndex];
        } else if (linkIndex === -1) {
          for (const colIndex in hyperlinks[i]) {
            if (hyperlinks[i][colIndex]) {
              problemLink = hyperlinks[i][colIndex];
              break;
            }
          }
        }
        
        const problem = {
          id: i,
          name: row[problemIndex] || `Problem ${i}`,
          difficulty: difficultyIndex !== -1 ? row[difficultyIndex] || 'Medium' : 'Medium',
          link: problemLink,
          status: 'pending'
        };
        
        if (topicIndex !== -1 && row[topicIndex]) {
          problem.topic = row[topicIndex];
        }
        
        const section = (sectionIndex !== -1 && row[sectionIndex]) 
          ? row[sectionIndex]
          : 'General';
        
        if (!sectionMap[section]) {
          sectionMap[section] = {
            title: section,
            problems: []
          };
        }
        
        sectionMap[section].problems.push(problem);
      }
      
      const sections = Object.values(sectionMap);
      
      const newSheet = {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        name: title,
        description: description || 'Custom SDE sheet',
        count: sections.reduce((count, section) => count + section.problems.length, 0),
        icon: selectedIcon,
        color: selectedColor,
        lightColor: selectedBgLight,
        sections: sections
      };
      
      const existingSheets = JSON.parse(localStorage.getItem('sdeSheets')) || [];
      localStorage.setItem('sdeSheets', JSON.stringify([...existingSheets, newSheet]));
      
      navigate('/sde');
      
    } catch (error) {
      console.error('Error processing sheet:', error);
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleColorSelect = (color, bgLight) => {
    setSelectedColor(color);
    setSelectedBgLight(bgLight);
  };

  return (
    <div className="p-8">
      <HeaderBar 
        title="Upload SDE Sheet" 
        subtitle="Create a new sheet from an Excel file"
      />
      
      <Link 
        to="/sde" 
        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Back to All Sheets
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sheet Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Sheet Title*
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., My DSA Practice Sheet"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows="3"
                  placeholder="A brief description of this sheet and its focus areas..."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose an Icon
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {iconOptions.map((option) => (
                    <div
                      key={option.icon}
                      onClick={() => handleIconSelect(option.icon)}
                      className={`p-3 border rounded-md flex flex-col items-center cursor-pointer hover:bg-gray-50 ${
                        selectedIcon === option.icon ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                      }`}
                    >
                      <i className={`${option.icon} text-xl text-gray-700 mb-1`}></i>
                      <span className="text-xs text-gray-600">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a Color
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {colorOptions.map((option) => (
                    <div
                      key={option.color}
                      onClick={() => handleColorSelect(option.color, option.bgLight)}
                      className={`p-3 border rounded-md flex flex-col items-center cursor-pointer hover:bg-gray-50 ${
                        selectedColor === option.color ? 'border-teal-500' : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${option.color} mb-1`}></div>
                      <span className="text-xs text-gray-600">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="excel-file" className="block text-sm font-medium text-gray-700 mb-1">
                  Excel File*
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <i className="fa-solid fa-file-excel text-gray-400 text-3xl mb-3"></i>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="excel-file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none"
                      >
                        <span>Upload Excel file</span>
                        <input 
                          id="excel-file" 
                          name="excel-file" 
                          type="file" 
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".xlsx,.xls,.csv"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Excel file (.xlsx, .xls) or CSV with problem data. Hyperlinks will be automatically extracted.
                    </p>
                    {fileName && (
                      <p className="text-sm text-teal-600 mt-2">
                        <i className="fa-solid fa-check-circle mr-1"></i> {fileName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  <i className="fa-solid fa-circle-exclamation mr-2"></i>
                  {error}
                </div>
              )}
              
              <div className="flex justify-end">
                <Link
                  to="/sde"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-3 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center disabled:opacity-70"
                >
                  {isUploading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-save mr-2"></i>
                      Save Sheet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sheet Preview</h2>
            
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedColor} flex items-center justify-center shadow-sm mr-4`}>
                <i className={`${selectedIcon} text-white text-lg`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title || 'Sheet Title'}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              {description || 'Sheet description will appear here...'}
            </p>
            
            {preview ? (
              <div className="mt-4">
                <div className="p-3 bg-gray-50 rounded-lg mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Problems</span>
                    <span className="text-sm font-bold text-teal-600">{preview.totalProblems}</span>
                  </div>
                </div>
                
                {Object.keys(preview.difficulties).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty Breakdown</h4>
                    {Object.entries(preview.difficulties).map(([difficulty, count]) => (
                      <div key={difficulty} className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{difficulty}</span>
                        <span className="text-xs font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {preview.sections.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top Sections</h4>
                    {preview.sections.slice(0, 5).map((section) => (
                      <div key={section.name} className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{section.name}</span>
                        <span className="text-xs font-medium">{section.count}</span>
                      </div>
                    ))}
                    {preview.sections.length > 5 && (
                      <div className="text-xs text-gray-500 mt-1">
                        +{preview.sections.length - 5} more sections
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <i className="fa-solid fa-file-excel text-4xl mb-3"></i>
                <p className="text-sm">Upload an Excel file to preview sheet contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDESheetUpload; 