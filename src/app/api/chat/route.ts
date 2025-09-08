import { NextRequest, NextResponse } from 'next/server';

// Professional chatbot responses with company focus
const professionalResponses = {
  // Company Information
  'company services': `🎯 **Jackpot Company Services:**

**Core Services:**
• AI-Powered Customer Support Solutions
• Document Analysis & Processing
• Business Intelligence & Analytics  
• Custom Software Development
• Cloud Integration Services

**Specialized Solutions:**
• Automated Customer Query Resolution
• Enterprise Document Management
• Real-time Data Processing
• Professional Consultation Services

Would you like detailed information about any specific service?`,

  'contact support': `📞 **Customer Support Contact Information:**

**Primary Support Channels:**
• **Email:** support@jackpot.com
• **Phone:** +1-800-JACKPOT (24/7 Support)
• **Live Chat:** Available right here in this interface
• **Business Hours:** Monday-Friday, 9 AM - 6 PM (EST)

**Emergency Support:**
• **Critical Issues:** emergency@jackpot.com
• **Response Time:** Within 1 hour for critical issues

**Support Levels:**
• Basic Support: Email response within 24 hours
• Premium Support: Phone support with 2-hour response
• Enterprise Support: Dedicated support manager

How can I assist you with your specific issue today?`,

  'pricing plans': `💰 **Jackpot Pricing Plans:**

**Starter Plan - $29/month**
• Basic AI Support (100 queries/month)
• Standard Response Time (2-4 hours)
• Email Support
• Basic Analytics

**Professional Plan - $99/month**
• Advanced AI Support (1000 queries/month)  
• Priority Response Time (30 minutes)
• Phone & Chat Support
• Advanced Analytics & Reporting
• Document Processing (50 docs/month)

**Enterprise Plan - $299/month**
• Unlimited AI Support
• Instant Response Time
• Dedicated Account Manager
• Custom Integration Support
• Unlimited Document Processing
• White-label Options

**Custom Solutions:** Contact us for enterprise-specific pricing

Would you like to schedule a demo or need more details about any plan?`,

  'features': `🚀 **Jackpot AI Assistant Features:**

**Intelligent Chat Support:**
• Natural language understanding
• Context-aware conversations
• Multi-language support
• 24/7 availability

**Document Processing:**
• PDF, Word, Excel analysis
• Automatic content extraction
• Smart search within documents
• Summary generation

**Business Intelligence:**
• Real-time analytics
• Customer interaction insights
• Performance metrics
• Custom reporting

**Integration Capabilities:**
• CRM system integration
• API access for developers
• Webhook notifications
• Third-party tool connections

What specific feature would you like to learn more about?`,

  'security': `🔒 **Security & Privacy at Jackpot:**

**Data Protection:**
• End-to-end encryption for all communications
• GDPR & CCPA compliant
• SOC 2 Type II certified
• Regular security audits

**Privacy Measures:**
• No data sharing with third parties
• User data deletion on request
• Transparent data usage policies
• Secure cloud infrastructure

**Access Controls:**
• Multi-factor authentication
• Role-based permissions
• Activity logging and monitoring
• Regular access reviews

Your data security is our top priority. Any specific security concerns I can address?`
};

// Default professional responses for common queries
const getDefaultResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('service') || lowerQuery.includes('what do you do')) {
    return professionalResponses['company services'];
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('support') || lowerQuery.includes('help')) {
    return professionalResponses['contact support'];
  }
  
  if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('plan')) {
    return professionalResponses['pricing plans'];
  }
  
  if (lowerQuery.includes('feature') || lowerQuery.includes('capability') || lowerQuery.includes('what can you do')) {
    return professionalResponses['features'];
  }
  
  if (lowerQuery.includes('security') || lowerQuery.includes('privacy') || lowerQuery.includes('safe')) {
    return professionalResponses['security'];
  }

  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `Hello! 👋 Welcome to Jackpot AI Assistant. I'm here to provide professional answers to all your questions about our services, pricing, features, and more. 

**How can I help you today?**
• Ask about our company services
• Get pricing information
• Learn about our features
• Contact support options
• Technical questions
• Document analysis

Feel free to upload documents or ask any questions - I'm here to provide detailed, professional assistance!`;
  }

  if (lowerQuery.includes('thank')) {
    return `You're very welcome! 😊 

I'm glad I could help. If you have any more questions about our services, need technical support, or want to learn more about Jackpot's capabilities, please don't hesitate to ask.

**Need further assistance with:**
• Technical support issues
• Service demonstrations  
• Custom solution planning
• Integration questions
• Account management

I'm here 24/7 to provide professional support!`;
  }

  // Generic professional response
  return `Thank you for your question! 🎯

I'm Jackpot AI Assistant, designed to provide professional answers and support. While I may not have specific information about "${query}" in my current knowledge base, I can help you with:

**Company Information:**
• Our services and solutions
• Pricing and plans
• Features and capabilities
• Contact information

**Technical Support:**
• Document analysis and processing
• Integration questions
• Troubleshooting assistance
• Best practices

**Customer Service:**
• Account management
• Billing inquiries
• Service upgrades
• Custom solutions

Could you please rephrase your question or let me know how I can better assist you? I'm committed to providing you with accurate, professional information.`;
};

export async function POST(request: NextRequest) {
  try {
    const { message, files } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Add delay to simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get professional response
    let response = getDefaultResponse(message);

    // Add context about uploaded files if any
    if (files && files.length > 0) {
      response += `\n\n📄 **Regarding your uploaded files (${files.join(', ')}):**\nI can help you analyze and extract information from these documents. Feel free to ask specific questions about their content, and I'll provide detailed professional answers based on the document analysis.`;
    }

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString(),
      messageId: Date.now().toString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'I apologize for the technical difficulty. Our support team has been notified. Please try again, or contact our support team directly for immediate assistance.',
        supportEmail: 'support@jackpot.com',
        supportPhone: '+1-800-JACKPOT'
      },
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}