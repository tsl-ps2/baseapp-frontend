/**
 * @generated SignedSource<<6d1833ac04981218b0763c0c00df00f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */

/* eslint-disable */
// @ts-nocheck
import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'

export type Verbs = 'SENT_MESSAGE' | '%future added value'

export type MessageItemFragment$data = {
  readonly content: string | null | undefined
  readonly created: any
  readonly extraData: any | null | undefined
  readonly id: string
  readonly inReplyTo:
    | {
        readonly id: string
      }
    | null
    | undefined
  readonly pk: number
  readonly profile:
    | {
        readonly id: string
      }
    | null
    | undefined
  readonly verb: Verbs | null | undefined
  readonly ' $fragmentType': 'MessageItemFragment'
}
export type MessageItemFragment$key = {
  readonly ' $data'?: MessageItemFragment$data
  readonly ' $fragmentSpreads': FragmentRefs<'MessageItemFragment'>
}

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = [v0 /*: any*/]
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'MessageItemFragment',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'content',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'created',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'extraData',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Message',
        kind: 'LinkedField',
        name: 'inReplyTo',
        plural: false,
        selections: v1 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'pk',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Profile',
        kind: 'LinkedField',
        name: 'profile',
        plural: false,
        selections: v1 /*: any*/,
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'verb',
        storageKey: null,
      },
    ],
    type: 'Message',
    abstractKey: null,
  }
})()

;(node as any).hash = '4604c0648fefbb7d9620f96f514a43af'

export default node
