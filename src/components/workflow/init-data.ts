import type { FlowDocumentJSON } from '@/types/workflow/node';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
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
      data: {
        title: 'Condition',
        conditions: [
          {
            key: 'if_0',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'query'],
              },
              operator: 'contains',
              right: {
                type: 'constant',
                content: 'Hello Flow.',
              },
            },
          },
          {
            key: 'if_f0rOAt',
            value: {
              left: {
                type: 'ref',
                content: ['start_0', 'enable'],
              },
              operator: 'is_true',
            },
          },
        ],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 2220,
          y: 381.75,
        },
      },
      data: {
        title: 'End',
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'loop_H8M3U',
      type: 'loop',
      meta: {
        position: {
          x: 1020,
          y: 547.96875,
        },
      },
      data: {
        title: 'Loop_2',
        batchFor: {
          type: 'ref',
          content: ['start_0', 'array_obj'],
        },
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
      blocks: [
        {
          id: 'llm_CBdCg',
          type: 'llm',
          meta: {
            position: {
              x: 180,
              y: 0,
            },
          },
          data: {
            title: 'LLM_4',
            inputsValues: {
              modelType: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: 'You are an AI assistant.',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelType', 'temperature', 'prompt'],
              properties: {
                modelType: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                },
                prompt: {
                  type: 'string',
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
        {
          id: 'llm_gZafu',
          type: 'llm',
          meta: {
            position: {
              x: 640,
              y: 0,
            },
          },
          data: {
            title: 'LLM_5',
            inputsValues: {
              modelType: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: 'You are an AI assistant.',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelType', 'temperature', 'prompt'],
              properties: {
                modelType: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                },
                prompt: {
                  type: 'string',
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
      ],
      edges: [
        {
          sourceNodeID: 'llm_CBdCg',
          targetNodeID: 'llm_gZafu',
        },
      ],
    },
    {
      id: '159623',
      type: 'comment',
      meta: {
        position: {
          x: 640,
          y: 522.46875,
        },
      },
      data: {
        size: {
          width: 240,
          height: 150,
        },
        note: 'hi ~\n\nthis is a comment node\n\n- flowgram.ai',
      },
    },
    {
      id: 'group_V-_st',
      type: 'group',
      meta: {
        position: {
          x: 1020,
          y: 96.25,
        },
      },
      data: {
        title: 'LLM_Group',
        color: 'Violet',
      },
      blocks: [
        {
          id: 'llm_0',
          type: 'llm',
          meta: {
            position: {
              x: 640,
              y: 0,
            },
          },
          data: {
            title: 'LLM_0',
            inputsValues: {
              modelType: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: 'You are an AI assistant.',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelType', 'temperature', 'prompt'],
              properties: {
                modelType: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                },
                prompt: {
                  type: 'string',
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
        {
          id: 'llm_l_TcE',
          type: 'llm',
          meta: {
            position: {
              x: 180,
              y: 0,
            },
          },
          data: {
            title: 'LLM_1',
            inputsValues: {
              modelType: {
                type: 'constant',
                content: 'gpt-3.5-turbo',
              },
              temperature: {
                type: 'constant',
                content: 0.5,
              },
              systemPrompt: {
                type: 'constant',
                content: 'You are an AI assistant.',
              },
              prompt: {
                type: 'constant',
                content: '',
              },
            },
            inputs: {
              type: 'object',
              required: ['modelType', 'temperature', 'prompt'],
              properties: {
                modelType: {
                  type: 'string',
                },
                temperature: {
                  type: 'number',
                },
                systemPrompt: {
                  type: 'string',
                },
                prompt: {
                  type: 'string',
                },
              },
            },
            outputs: {
              type: 'object',
              properties: {
                result: {
                  type: 'string',
                },
              },
            },
          },
        },
      ],
      edges: [
        {
          sourceNodeID: 'llm_l_TcE',
          targetNodeID: 'llm_0',
        },
        {
          sourceNodeID: 'llm_0',
          targetNodeID: 'end_0',
        },
        {
          sourceNodeID: 'condition_0',
          targetNodeID: 'llm_l_TcE',
          sourcePortID: 'if_0',
        },
      ],
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'condition_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'llm_l_TcE',
      sourcePortID: 'if_0',
    },
    {
      sourceNodeID: 'condition_0',
      targetNodeID: 'loop_H8M3U',
      sourcePortID: 'if_f0rOAt',
    },
    {
      sourceNodeID: 'llm_0',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'loop_H8M3U',
      targetNodeID: 'end_0',
    },
  ],
};
