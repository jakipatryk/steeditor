import { compose, merge, pipe, zip } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';
import { SteemPostOperation } from './../SteemPostOperation';
import { withAllowCurationRewards } from './withAllowCurationRewards';
import { withAllowVotes } from './withAllowVotes';
import { withAuthor } from './withAuthor';
import { withBody } from './withBody';
import { withExtensions } from './withExtensions';
import { withJsonMetadata } from './withJsonMetadata';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';
import { withParentAuthor } from './withParentAuthor';
import { withParentPermlink } from './withParentPermlink';
import { withPercentSteemDollars } from './withPercentSteemDollars';
import { withPermlink } from './withPermlink';
import { withTitle } from './withTitle';

/**
 * Used internally in @see steemizePost, creates an object with `permlink` and `author` props.
 */
export const _createCommon = (
  steeditorPost: SteeditorPost,
  author: string
): { permlink: string; author: string } =>
  pipe(
    withPermlink(steeditorPost),
    withAuthor(author)
  )({});

/**
 * Steemizes a Steeditor's post.
 * @param steeditorPost A post object used within Steeditor app.
 * @param author Name of author of the post.
 * @returns Steem operations array: `comment` and `comment_options`
 */
export const steemizePost = (
  steeditorPost: SteeditorPost,
  author: string
): SteemPostOperation => {
  const commonProps = _createCommon(steeditorPost, author);
  return zip(
    ['comment', 'comment_options'],
    [
      merge(
        commonProps,
        compose(
          withParentAuthor(steeditorPost),
          withParentPermlink(steeditorPost),
          withBody(steeditorPost),
          withTitle(steeditorPost),
          withJsonMetadata(steeditorPost)
        )({})
      ),
      merge(
        commonProps,
        compose(
          withAllowCurationRewards(steeditorPost),
          withAllowVotes(steeditorPost),
          withMaxAcceptedPayout(steeditorPost),
          withPercentSteemDollars(steeditorPost),
          withExtensions(steeditorPost)
        )({})
      )
    ]
  );
};
