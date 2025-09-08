import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/jpg'
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} not supported. Please upload PDF, Word, Text, or Image files.` },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Maximum size is 10MB.` },
          { status: 400 }
        );
      }

      // In a real application, you would upload to cloud storage
      // For now, we'll just process the file metadata
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: 'processed'
      };

      uploadedFiles.push(fileInfo);
    }

    return NextResponse.json({
      message: `Successfully processed ${uploadedFiles.length} file(s)`,
      files: uploadedFiles,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Upload API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process file upload. Please try again or contact support.',
        supportEmail: 'support@jackpot.com'
      },
      { status: 500 }
    );
  }
}

// Handle file analysis endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json(
      { error: 'File name is required' },
      { status: 400 }
    );
  }

  // Mock file analysis response
  const analysisResult = {
    fileName,
    analysisDate: new Date().toISOString(),
    summary: `Analysis of ${fileName} completed successfully. The document contains professional content that can be queried through our AI assistant.`,
    pageCount: Math.floor(Math.random() * 20) + 1,
    wordCount: Math.floor(Math.random() * 5000) + 100,
    topics: ['Business Process', 'Documentation', 'Professional Content'],
    extractedText: 'Sample extracted text for demonstration purposes...'
  };

  return NextResponse.json(analysisResult);
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}