import { NextRequest, NextResponse } from 'next/server';

// Mock document database
let documents: Array<{
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
  analysis?: {
    summary: string;
    pageCount: number;
    wordCount: number;
    topics: string[];
  };
}> = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (documentId) {
      // Get specific document
      const document = documents.find(doc => doc.id === documentId);
      
      if (!document) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(document);
    }

    // Get all documents
    return NextResponse.json({
      documents,
      totalCount: documents.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Documents GET error:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, size, type } = await request.json();

    if (!name || !size || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, size, type' },
        { status: 400 }
      );
    }

    const newDocument = {
      id: Date.now().toString(),
      name,
      size,
      type,
      uploadedAt: new Date().toISOString(),
      status: 'processing' as const
    };

    documents.push(newDocument);

    // Simulate processing
    setTimeout(() => {
      const doc = documents.find(d => d.id === newDocument.id);
      if (doc) {
        doc.status = 'ready';
        doc.analysis = {
          summary: `Professional document "${name}" has been analyzed and is ready for queries.`,
          pageCount: Math.floor(Math.random() * 20) + 1,
          wordCount: Math.floor(Math.random() * 5000) + 100,
          topics: ['Business Content', 'Professional Documentation', 'Data Analysis']
        };
      }
    }, 3000);

    return NextResponse.json({
      message: 'Document registered successfully',
      document: newDocument,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Documents POST error:', error);
    
    return NextResponse.json(
      { error: 'Failed to register document' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const index = documents.findIndex(doc => doc.id === documentId);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    documents.splice(index, 1);

    return NextResponse.json({
      message: 'Document deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Documents DELETE error:', error);
    
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}