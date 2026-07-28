/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type OpenAI from 'openai';
import type { ChatCompleteReasoning } from '@kbn/inference-common';

export type OpenAIRequest = Omit<OpenAI.ChatCompletionCreateParams, 'model'> & {
  model?: string;
  /**
   * Reasoning configuration, as accepted by the Elasticsearch unified chat
   * completion API (`elastic` provider / EIS only). Not part of the OpenAI
   * request format.
   */
  reasoning?: ChatCompleteReasoning;
};

// duplicated from x-pack/platform/plugins/shared/stack_connectors/common/openai/constants.ts
// because depending on stack_connectors from the inference plugin creates a cyclic dependency...
export enum OpenAiProviderType {
  OpenAi = 'OpenAI',
  AzureAi = 'Azure OpenAI',
  Other = 'Other',
}
