# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Develop: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`

## Architecture & Structure
- **Framework**: Next.js (App Router) using TypeScript and Tailwind CSS 4.
- **Content Management**: Integrates with Strapi for blog content.
    - Strapi client logic is located in `lib/strapi/`.
    - Type definitions for content are in `types/`.
- **Project Layout**:
    - `app/`: Contains the main application routes, including the blog and services pages.
    - `components/`: Organized into `layout` (headers/footers), `sections` (page-specific content), and `ui` (reusable base components).
    - `data/`: Contains static data files for products and case studies.
    - `lib/`: Shared utility functions and API clients.
    - `public/`: Static assets, including images and SVGs.
- **Styling**: Uses Tailwind CSS 4 with `motion` for animations and `radix-ui` for accessible primitives.
