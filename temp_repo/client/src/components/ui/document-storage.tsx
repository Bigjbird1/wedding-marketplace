import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Eye, Clock, Shield, Folder, ChevronDown, Star } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DocumentStorage = () => {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const folders = [
    { id: 'all', name: 'All Documents', count: 24 },
    { id: 'contracts', name: 'Contracts', count: 12 },
    { id: 'addendums', name: 'Addendums', count: 6 },
    { id: 'venue', name: 'Venue Documents', count: 4 },
    { id: 'archived', name: 'Archived', count: 2 }
  ];

  const documents = [
    {
      id: 1,
      type: 'contract',
      title: 'Wedding Date Transfer Agreement',
      date: '2024-02-20',
      size: '2.4 MB',
      status: 'signed',
      parties: ['Sarah M.', 'Emma D.'],
      starred: true
    },
    {
      id: 2,
      type: 'addendum',
      title: 'Payment Schedule Addendum',
      date: '2024-02-20',
      size: '1.1 MB',
      status: 'pending',
      parties: ['Sarah M.', 'Emma D.'],
      starred: false
    },
    {
      id: 3,
      type: 'venue',
      title: 'Venue Policy Document',
      date: '2024-02-19',
      size: '3.2 MB',
      status: 'verified',
      parties: ['Grand Estate'],
      starred: false
    }
  ];

  const renderFolders = () => (
    <div className="w-64 border-r">
      <div className="p-4">
        <h2 className="font-medium mb-4">Folders</h2>
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between ${
                selectedFolder === folder.id
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4 text-gray-400" />
                <span>{folder.name}</span>
              </div>
              <span className="text-sm text-gray-500">{folder.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocumentCard = (doc) => (
    <div key={doc.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              doc.type === 'contract' ? 'bg-blue-50' :
              doc.type === 'addendum' ? 'bg-purple-50' : 'bg-green-50'
            }`}>
              <FileText className={`w-5 h-5 ${
                doc.type === 'contract' ? 'text-blue-500' :
                doc.type === 'addendum' ? 'text-purple-500' : 'text-green-500'
              }`} />
            </div>
            <div>
              <div className="font-medium">{doc.title}</div>
              <div className="text-sm text-gray-600">{doc.date}</div>
            </div>
          </div>
          <button
            onClick={() => {/* Toggle star */}}
            className={`p-1 rounded hover:bg-gray-100 ${
              doc.starred ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Star className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            doc.status === 'signed' ? 'bg-green-100 text-green-800' :
            doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {doc.status}
          </span>
          <span className="text-sm text-gray-500">{doc.size}</span>
        </div>

        {doc.parties.length > 0 && (
          <div className="flex items-center gap-1 mb-4">
            {doc.parties.map((party, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs"
              >
                {party.charAt(0)}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between border-t pt-3">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <Eye className="w-4 h-4" /> View
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Document Storage</h1>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Upload Document
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border">
          <div className="flex">
            {renderFolders()}
            
            <div className="flex-1 p-6">
              <div className="grid grid-cols-2 gap-4">
                {documents.map((doc) => renderDocumentCard(doc))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStorage;
