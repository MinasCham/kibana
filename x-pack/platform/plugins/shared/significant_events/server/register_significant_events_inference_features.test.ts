/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  SIGNIFICANT_EVENTS_KI_EXTRACTION_INFERENCE_FEATURE_ID,
  SIGNIFICANT_EVENTS_KI_QUERY_GENERATION_INFERENCE_FEATURE_ID,
} from '@kbn/significant-events-schema';
import { defaultInferenceEndpoints } from '@kbn/inference-common';
import { getReasoningForFeatureConnector } from './register_significant_events_inference_features';

describe('getReasoningForFeatureConnector', () => {
  it('returns the configured effort for a recommended KI extraction endpoint', () => {
    expect(
      getReasoningForFeatureConnector(
        SIGNIFICANT_EVENTS_KI_EXTRACTION_INFERENCE_FEATURE_ID,
        defaultInferenceEndpoints.OPENAI_GPT_5_4
      )
    ).toEqual({ effort: 'low' });
  });

  it('returns undefined for an endpoint without a configured effort', () => {
    expect(
      getReasoningForFeatureConnector(
        SIGNIFICANT_EVENTS_KI_EXTRACTION_INFERENCE_FEATURE_ID,
        defaultInferenceEndpoints.ANTHROPIC_CLAUDE_4_6_SONNET
      )
    ).toBeUndefined();
  });

  it('returns undefined for a user-chosen connector that is not in the map', () => {
    expect(
      getReasoningForFeatureConnector(
        SIGNIFICANT_EVENTS_KI_QUERY_GENERATION_INFERENCE_FEATURE_ID,
        'my-custom-openai-connector'
      )
    ).toBeUndefined();
  });

  it('returns undefined for a feature without an effort map', () => {
    expect(
      getReasoningForFeatureConnector(
        'some_other_feature',
        defaultInferenceEndpoints.OPENAI_GPT_5_4
      )
    ).toBeUndefined();
  });
});
