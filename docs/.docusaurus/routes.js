import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/nastrih.cz/__docusaurus/debug',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug', '684'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/config',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/config', '79b'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/content',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/content', '2ec'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/globalData',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/globalData', 'db4'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/metadata',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/metadata', 'a6d'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/registry',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/registry', '35f'),
    exact: true
  },
  {
    path: '/nastrih.cz/__docusaurus/debug/routes',
    component: ComponentCreator('/nastrih.cz/__docusaurus/debug/routes', '62f'),
    exact: true
  },
  {
    path: '/nastrih.cz/markdown-page',
    component: ComponentCreator('/nastrih.cz/markdown-page', 'e2c'),
    exact: true
  },
  {
    path: '/nastrih.cz/docs',
    component: ComponentCreator('/nastrih.cz/docs', 'c87'),
    routes: [
      {
        path: '/nastrih.cz/docs',
        component: ComponentCreator('/nastrih.cz/docs', '186'),
        routes: [
          {
            path: '/nastrih.cz/docs',
            component: ComponentCreator('/nastrih.cz/docs', '98f'),
            routes: [
              {
                path: '/nastrih.cz/docs/backend/overview',
                component: ComponentCreator('/nastrih.cz/docs/backend/overview', 'c6f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/deployment/ci-cd',
                component: ComponentCreator('/nastrih.cz/docs/deployment/ci-cd', 'b5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/frontend/overview',
                component: ComponentCreator('/nastrih.cz/docs/frontend/overview', 'd80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/guides',
                component: ComponentCreator('/nastrih.cz/docs/guides', 'a74'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/guides/admin-panel',
                component: ComponentCreator('/nastrih.cz/docs/guides/admin-panel', '3ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/guides/booking-flow',
                component: ComponentCreator('/nastrih.cz/docs/guides/booking-flow', '9d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/guides/components',
                component: ComponentCreator('/nastrih.cz/docs/guides/components', 'fdb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/guides/getting-started',
                component: ComponentCreator('/nastrih.cz/docs/guides/getting-started', 'bc0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/guides/theme-system',
                component: ComponentCreator('/nastrih.cz/docs/guides/theme-system', '81c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/intro',
                component: ComponentCreator('/nastrih.cz/docs/intro', '94d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/congratulations', '9c9'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/create-a-blog-post', 'ae1'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/create-a-document', '51a'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/create-a-page', 'f82'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/deploy-your-site', 'b83'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-basics/markdown-features', '464'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-extras/manage-docs-versions', '3cf'),
                exact: true
              },
              {
                path: '/nastrih.cz/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/nastrih.cz/docs/tutorial-extras/translate-your-site', 'c66'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/nastrih.cz/',
    component: ComponentCreator('/nastrih.cz/', '64a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
