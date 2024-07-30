import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { lazy } from 'react';
import Layout from './components/Layout'; // Adjust the import path accordingly

export const ROUTES = {
  HOME: '/test-layout',
  FORM: '/test-layout-form',
  SELECT: '/test-select'
};

const PageHome = lazy(() => import('./pages/PageHome/PageHome'));
const PageForm = lazy(() => import('./pages/PageForm/PageForm'));
const PageSelect = lazy(() => import('./pages/PageSelect/PageSelect'));

const routerList = [
  {
    path: '/',
    element: <Navigate to={ROUTES.HOME} replace />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <PageHome />
      },
      {
        path: ROUTES.FORM,
        element: <PageForm />
      },
      {
        path: ROUTES.SELECT,
        element: <PageSelect />
      }
    ]
  }
];

export const router = createBrowserRouter(routerList as any);
