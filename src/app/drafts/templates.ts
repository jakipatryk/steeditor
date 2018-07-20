import { Template } from './models/template.model';
import { makeEntities } from '../shared/utils';

// tslint:disable:max-line-length

export const UTOPIAN_CONTRIBUTION_SUGGESTIONS: Template = {
  name: 'Utopian contribution: Suggestions',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Suggestions category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Components
Specify the components/features/interfaces/applications of the software your suggestion relates to.

#### Proposal Description
Detail your proposal in length and explain how you think the above mentioned components/parts/sections should be modified/enhanced.

#### Mockups / Examples
If applicable, insert visual mockups, examples and flow-charts to show the possible result of the implementation of your suggestion.

#### Benefits
Illustrate and explain in depth the added value and benefits that your proposal holds, and the problems it will solve if implemented.

#### GitHub Account
Paste here the full url to your GitHub account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'ideas'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_DEVELOPMENT: Template = {
  name: 'Utopian contribution: Development',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Development category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

*Please use the following structure, depending on the type of your contribution.*

### Bug Fixes
- What was the issue(s)?
Describe briefly and add screenshots/recordings, if applicable.
Provide links to related issues on GitHub, that you fixed, if applicable.
- What was the solution?
Describe briefly how you fixed the issue(s).

### New Features
- What feature(s) did you add?
Describe briefly and add screenshots/recordings if applicable.
- How did you implement it/them?
Link to relevant lines in the code on GitHub and explain briefly what you added/changed.

### New Projects
- What is the project about?
Explain in great detail what your project is about and briefly describe already existing features.
- Technology Stack
Briefly list the used technologies and languages and other technical requirements.
- Roadmap
Write about your future plans related to the project.
- How to contribute?
Provide detailed information for contributors about you and how they can get in touch with you.

#### GitHub Account
Paste here the full url to your GitHub account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'development'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_GRAPHICS: Template = {
  name: 'Utopian contribution: Graphics',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Graphics category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Linked Task Request
Link to the task request e.g. https://steemit.com/utopian-io/@test-account/test-permlink

#### Details
Write here the details of your work. Paste the images of the final result.

#### Benefits / Improvements
Whether your work is an enhancement of an existing graphic or a completely new one, write here the benefits your work will bring to the project.

#### Proof of authorship
Provide screenshots or videos of the creation process. Show the steps of making of the graphics in such a detail, it could be replicated.

#### Tools
Write here the details of the tools you have used to create the graphic design. Provide as much information as possible to reproduce or edit your work.

#### Original files
Provide the original, editable, vector (if applicable) files that can be publicly downloaded and edited.

#### Proof of Work Done
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'graphics'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_BUGS: Template = {
  name: 'Utopian contribution: Bugs',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Bugs category.`,
  changeInPost: {
    body: `#### Project Information
* Repository:
e.g. https://github.com/utopian-io/utopian.io
* Project Name:
* Publisher (if applicable):

#### Expected behavior
Write here the details of the behaviour you were expecting when encountered this bug.

#### Actual behavior
Write here the details of the behaviour that you are experiencing as a bug.

#### How to reproduce
Write here every possible detail to reproduce the bug.

* Browser/App version:
* Operating system:

#### Recording Of The Bug
If the bug can be recorded on screen, please provide a short video or an animated GIF, otherwise delete this section.

#### GitHub Account
Paste here the full url to your GitHub account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'bug-hunting'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_ANALYSIS: Template = {
  name: 'Utopian contribution: Analysis',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Analysis category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Introduction
Include a brief explanation and overview of the information and analysis presented in this post.

#### Outline
- Scope
- Results
- Findings 1
- Findings 2
- Findings 3
- Conclusion
- Tools and Scripts
- Relevant Links and Resources

#### Scope
Describe and detail the information on the data extracted such as date of the analysis, timeframe of the analysed data, components of the analysis, etc.

#### Results
Detail the results of your analysis, including charts, tables and infographics for data readability.

##### Findings 1
Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

##### Findings 2
Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

##### Findings 3
Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

#### Conclusion
Write the conclusion of your analysis.

#### Tools and Scripts
Include a reference to the tools used (open source or commercial) to generate the data such as scripts, software, algorithms, etc.

#### Relevant Links and Resources
Add links to resources relevant to your analysis.

#### Proof of Authorship
Include verifiable proof of authorship of the work done.`,
    tags: ['utopian-io', 'analysis'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_VISABILITY: Template = {
  name: 'Utopian contribution: Visability',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Visability category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Linked Task Request
Link to the task request e.g. https://steemit.com/utopian-io/@test-account/test-permlink

#### Introduction
Describe your background as influencer and the reasons for choosing this specific project to promote.

#### Campaign Strategy
Explain your choice of target audience, selected keywords (when applicable), bidding strategy and ad message as it relates to the target audience.

#### Campaign Content
Link to the ads / posts / campaigns (when available) and screenshots of ad placement.

#### Campaign Results & Summary
Detail the results of the campaign in terms of performance, goals reached and (when possible) conclusions reached that may be applied in future promotions of this project.

#### Proof of Authorship
Include verifiable proof of ownership of the account used to execute the promotion.`,
    tags: ['utopian-io', 'social'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_VIDEO_TUTORIALS: Template = {
  name: 'Utopian contribution: Video Tutorials',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Video Tutorials category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### What Will I Learn?
In brief, write details of what the user is going to learn in a bullet list.

- You will learn Example A
- You will learn Example B
- You will learn Example C

#### Requirements
State the requirements the user needs in order to follow this tutorial.

- Example Requirement A
- Example Requirement B
- Example Requirement C

#### Difficulty
Choose one of the following options:

- Basic
- Intermediate
- Advanced

#### Description
A full description of the contents of this video tutorial and the topics it covers.

#### Video Tutorial
Embed the Youtube or Dtube video here.

#### Curriculum
Include a list of related video tutorials you have already shared on Utopian that make up a Course Curriculum, if applicable.

- [Example Tutorial A](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial B](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial C](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial D](https://steemit.com/utopian-io/@test-account/test-permlink)

#### Proof of Work Done
Insert here the full url of the code used in the tutorial, under your GitHub or a relevant gist, e.g. https://github.com/username/projname`,
    tags: ['utopian-io', 'video-tutorials'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_TUTORIALS: Template = {
  name: 'Utopian contribution: Tutorials',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Tutorials category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### What Will I Learn?
In brief, write details of what the user is going to learn in a bullet list.

- You will learn Example A
- You will learn Example B
- You will learn Example C

#### Requirements
State the requirements the user needs in order to follow this tutorial.

- Example Requirement A
- Example Requirement B
- Example Requirement C

#### Difficulty
Choose one of the following options:

- Basic
- Intermediate
- Advanced

#### Tutorial Contents
A full description of the topics covered in this tutorial, plus the contents of the tutorial itself.

#### Curriculum
Include a list of related tutorials you have already shared on Utopian that make up a Course Curriculum, if applicable.

- [Example Tutorial A](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial B](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial C](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Tutorial D](https://steemit.com/utopian-io/@test-account/test-permlink)

#### Proof of Work Done
Insert here the full url of the code used in the tutorial, under your GitHub or a relevant gist, e.g. https://github.com/username/projname`,
    tags: ['utopian-io', 'tutorials'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_COPYWRITING: Template = {
  name: 'Utopian contribution: Tutorials',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Copywriting category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Linked Task Request
Link to the task request e.g. https://steemit.com/utopian-io/@test-account/test-permlink

#### Overview
Describe the scope of your work and give context; include how your work meets the project's needs as described in the Utopian task request.

#### Actual content
Add the actual copy you created in its entirety or details with links to the full version.

#### Additional information
Add relevant notes and links to support your contribution. This may include additional information to verify authorship or prove implementation of your content by the project owners.

#### GitHub Account
Insert the full url to your GitHub account, if applicable. For example: https://github.com/username`,
    tags: ['utopian-io', 'copywriting'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_DOCUMENTATION: Template = {
  name: 'Utopian contribution: Documentation',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Documentation category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write details of the new/updated official documentation, highlighting all the important changes and additions made.

#### Components
Describe the components/parts/sections of the software your documentation is about.

#### Difference
If you have updated existing documentation, describe what has been changed and the reasons behind it, as well as the impact this has on the project.

#### Links
Insert public links to the updated official documentation.

#### GitHub Proof of Authorship
- GitHub Account: e.g. https://github.com/username
- Pull Request: insert a link to the pull request for your work (if applicable)`,
    tags: ['utopian-io', 'documentation'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_BLOG: Template = {
  name: 'Utopian contribution: Blog',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Blog category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Introduction
Write a short overview of the post goal and content.

#### Post Body
Write the post in readable and presentable form by utilizing markdown to style the text.

#### Resources
Include links and references to resources used in the post.

#### Series Backlinks
If the post is not the first post in a series, link to the previous posts of the series.

- [Example Blog Post A](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Blog Post B](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Blog Post C](https://steemit.com/utopian-io/@test-account/test-permlink)
- [Example Blog Post D](https://steemit.com/utopian-io/@test-account/test-permlink)`,
    tags: ['utopian-io', 'blog'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_CONTRIBUTION_TRANSLATION: Template = {
  name: 'Utopian contribution: Blog',
  description: `Fills out post's body with the standard template for the Utopian contribution in the Translation category.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Project Details
Describe the target project of your work, including your motivation to translate this particular projects, and what value it brings to the open source community.

#### Contribution Specifications

- Translation Overview
Explain the purpose of the text translated, their applications and uses and include an overview of the work you’ve done.

- Languages
List the source and target languages in this contribution. Be sure to also provide some insight on your expertise and translation experience in these languages.

- Word Count
Present a number report of the volume of the work done (number of words translated). Be sure to exclude duplicate strings and static text (like links and code) from your count.

### Proof of Authorship
Please make sure your Crowdin username is the same as the Steem username or modifiy your Crowdin profile details to verify the authorship of those translations. Add a link to your Crowdin profile in this section.`,
    tags: ['utopian-io', 'translations'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_BUG_HUNTERS: Template = {
  name: 'Utopian task request: for bug hunters',
  description: `Fills out post's body with the standard template for the Utopian task request for bug hunters.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-bug-hunting'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_ANALYSTS: Template = {
  name: 'Utopian task request: for analysts',
  description: `Fills out post's body with the standard template for the Utopian task request for analysts.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-analysis'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_INFLUENCERS: Template = {
  name: 'Utopian task request: for influencers',
  description: `Fills out post's body with the standard template for the Utopian task request for influencers.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-social'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_DESIGNERS: Template = {
  name: 'Utopian task request: for designers',
  description: `Fills out post's body with the standard template for the Utopian task request for designers.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-graphics'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_DEVELOPERS: Template = {
  name: 'Utopian task request: for developers',
  description: `Fills out post's body with the standard template for the Utopian task request for developers.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-development'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_TECH_WRITERS: Template = {
  name: 'Utopian task request: for tech writers',
  description: `Fills out post's body with the standard template for the Utopian task request for tech writers.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-documentation'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const UTOPIAN_TASK_REQUEST_COPYWRITERS: Template = {
  name: 'Utopian task request: for copywriters',
  description: `Fills out post's body with the standard template for the Utopian task request for copywriters.`,
  changeInPost: {
    body: `#### Repository
e.g. https://github.com/utopian-io/utopian.io

#### Details
Write here all the details about the task you are willing to get done, examples, links and/or screenshots.

#### Components
Write here the components/parts/sections of the software that will be affected once the task will be completed.

#### Deadline
Write here the date you wish the task to be completed.

#### Communication
Write here how the contributor should get in touch with you get more details about the task.

#### Github
Paste here the full url to your github account. E.g. https://github.com/username`,
    tags: ['utopian-io', 'task-copywriting'],
    beneficiaries: [{ account: 'utopian.pay', weight: 5 }]
  }
};

export const all = [
  UTOPIAN_CONTRIBUTION_ANALYSIS,
  UTOPIAN_CONTRIBUTION_BLOG,
  UTOPIAN_CONTRIBUTION_BUGS,
  UTOPIAN_CONTRIBUTION_COPYWRITING,
  UTOPIAN_CONTRIBUTION_DEVELOPMENT,
  UTOPIAN_CONTRIBUTION_DOCUMENTATION,
  UTOPIAN_CONTRIBUTION_GRAPHICS,
  UTOPIAN_CONTRIBUTION_SUGGESTIONS,
  UTOPIAN_CONTRIBUTION_TUTORIALS,
  UTOPIAN_CONTRIBUTION_VIDEO_TUTORIALS,
  UTOPIAN_CONTRIBUTION_VISABILITY,
  UTOPIAN_TASK_REQUEST_ANALYSTS,
  UTOPIAN_TASK_REQUEST_BUG_HUNTERS,
  UTOPIAN_TASK_REQUEST_COPYWRITERS,
  UTOPIAN_TASK_REQUEST_DESIGNERS,
  UTOPIAN_TASK_REQUEST_DEVELOPERS,
  UTOPIAN_TASK_REQUEST_INFLUENCERS,
  UTOPIAN_TASK_REQUEST_TECH_WRITERS
];

export const entities = makeEntities<Template>(all, 'name');
