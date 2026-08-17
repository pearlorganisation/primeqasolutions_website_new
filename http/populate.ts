import { BLOCKS } from "@/lib/utils/blocks";

export const populateSharedSections = {
  on: {
    [BLOCKS.HERO]: {
      populate: {
        primaryButton: true,
        secondaryButton: true,
      },
    },
    [BLOCKS.SERVICE_HERO]: { populate: "*" },
    [BLOCKS.CLIENT_STRIP]: { populate: "logo" },
    [BLOCKS.TRUST_BUILDING]: { populate: "*" },
    [BLOCKS.BENEFITS]: {
      populate: {
        heading: true,
        benifits: {
          populate: { icon: true },
        },
      },
    },
    [BLOCKS.SERVICES]: {
      populate: {
        heading: true,
        services: {
          populate: {
            icon: true,
            link: true,
          },
        },
      },
    },
    [BLOCKS.PRICING]: {
      populate: {
        heading: true,
        plans: {
          populate: { features: true, cta: true },
        },
      },
    },
    [BLOCKS.AUTOMATION_PROCESS]: {
      populate: {
        heading: true,
        process_items: {
          populate: {
            icon: true,
            sub_block_items: true,
          },
        },
      },
    },
    [BLOCKS.FEATURE]: {
      populate: {
        heading: true,
        stats: true,
        items: {
          populate: { icon: true },
        },
      },
    },
    [BLOCKS.TECH_STACK]: {
      populate: {
        heading: true,
        categories: {
          populate: {
            technologies: {
              populate: { icon: true },
            },
          },
        },
      },
    },
    [BLOCKS.FAQ]: {
      populate: {
        faq: {
          populate: { item: true },
        },
        faq_cta: {
          populate: {
            icon: true,
            button: true,
          },
        },
      },
    },
    [BLOCKS.CTA]: {
      populate: {
        heading: true,
        stats: true,
        form: {
          populate: { input_field: true },
        },
      },
    },
    [BLOCKS.CTA_BUTTON]: {
      populate: { button: true },
    },
    [BLOCKS.CTA_FORM]: {
      populate: {
        heading: true,
      },
    },
    [BLOCKS.CLIENTS]: {
      populate: {
        Heading: true,
        logo: true,
      },
    },
    [BLOCKS.METHODOLOGY]: {
      populate: {
        heading: true,
        items: true,
      },
    },
    [BLOCKS.CERTIFICATION]: {
      populate: {
        certifications: {
          populate: { image: true },
        },
      },
    },
    [BLOCKS.CLIENT_SUCCESS]: {
      populate: {
        header: true,
        testimonials: {
          populate: {
            // video: true,
            client: {
              populate: { photo: true },
            },
          },
        },
      },
    },
    [BLOCKS.AI_ADVANTAGE]: {
      populate: {
        heading: true,
        feature_items: {
          populate: {
            icon: true,
            link: true,
          },
        },
        circle_items: {
          populate: {
            icon: true,
            link: true,
          },
        },
      },
    },
    [BLOCKS.PRODUCTS]: {
      populate: {
        heading: true,
        products: {
          populate: {
            product: {
              populate: {
                image: { fields: ["url", "alternativeText"] },
                link: { populate: "*" },
              },
            },
          },
        },
      },
    },
    [BLOCKS.CASE_STUDY_BLOCK]: {
      populate: {
        heading: true,
        case_studies: {
          populate: {
            image: { fields: ["url", "alternativeText"] },
            page_section: {
              on: {
                [BLOCKS.CASE_STUDY_INFO]: { populate: "*" },
                [BLOCKS.CASE_STUDY_STATS]: {
                  populate: { stats_items: true },
                },
              },
            },
          },
        },
      },
    },
    [BLOCKS.TEAM_BLOCK]: {
      populate: {
        heading: true,
        members: {
          populate: {
            image: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
      },
    },
    [BLOCKS.SPLIT_BLOCK]: {
      populate: {
        primaryButton: true,
        secondaryButton: true,
        image: { fields: ["url", "alternativeText", "width", "height"] },
      },
    },
    [BLOCKS.HEADING_BLOCK]: { populate: "*" },
    [BLOCKS.CLUTCH_WIDGET]: { populate: "*" },
    [BLOCKS.OFFICE_GALLERY_BLOCK]: {
      populate: {
        heading: true,
        images: {
          populate: { image: true },
        },
      },
    },
    [BLOCKS.OFFER]: {
      populate: {
        heading: true,
        offers: {
          populate: {
            image: true,
            icon_list: {
              populate: { icon: true },
            },
            custom_link: true,
          },
        },
      },
    },
    [BLOCKS.INDUSTRY_BLOCK]: {
      populate: {
        heading: true,
        industries: {
          fields: ["name", "slug"],
          populate: {
            page_section: {
              on: {
                [BLOCKS.SERVICE_HERO]: {
                  populate: {
                    image: { fields: ["url", "alternativeText", "width", "height", "formats"] }
                  }
                }
              }
            }
          },
        },
      },
    },
  },
};

export const basePopulateConfig = {
  meta_data: {
    fields: ["title", "description", "canonical_url"],
    populate: {
      og: {
        fields: ["title", "description", "url"],
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  },
  page_section: populateSharedSections,
};
