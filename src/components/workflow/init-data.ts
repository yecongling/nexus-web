import type { FlowDocumentJSON } from '@/types/workflow/node';

export const initData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'http_0023423',
      type: 'http',
      meta: {
        position: {
          x: 180,
          y: 381.75,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              default: 'Hello Flow.',
            },
            enable: {
              type: 'boolean',
              default: true,
            },
            array_obj: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  int: {
                    type: 'number',
                  },
                  str: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      id: 'condition_0',
      type: 'condition',
      meta: {
        position: {
          x: 640,
          y: 363.25,
        },
      },
      data: {},
    },
  ],
  edges: [
    {
      sourceNodeID: 'http_0023423',
      targetNodeID: 'condition_0',
    },
  ],
};
