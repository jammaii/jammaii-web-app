import { NextRequest } from 'next/server';
import { ProjectService } from '@/server/api/features/services/project.service';
import { Readable } from 'stream';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return new Response(JSON.stringify({ error: 'Missing projectId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get the Readable stream from ProjectService
    const readableStream = await ProjectService.downloadProjectUsers(projectId);

    // Convert the Node.js Readable stream to a Buffer
    const buffer = await readableToBuffer(readableStream);

    return new Response(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=project_users.xlsx'
      }
    });
  } catch (error) {
    console.error('Download failed', error);
    return new Response(JSON.stringify({ error: 'Download failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Function to convert Node.js Readable to Buffer
async function readableToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
}
