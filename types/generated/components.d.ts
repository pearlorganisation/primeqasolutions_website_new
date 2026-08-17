import type { Schema, Struct } from '@strapi/strapi';

export interface BlockAiAdvantageBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_ai_advantage_blocks';
  info: {
    displayName: 'Ai Advantage Block';
  };
  attributes: {
    circle_items: Schema.Attribute.Component<'block.feature-item', true>;
    feature_items: Schema.Attribute.Component<'block.feature-item', true>;
    heading: Schema.Attribute.Component<'block.heading-block', false>;
    variant: Schema.Attribute.Enumeration<['v1', 'v2', 'v3', 'v4']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockAutomationProcess extends Struct.ComponentSchema {
  collectionName: 'components_block_automation_processes';
  info: {
    displayName: 'Automation Process';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false>;
    process_items: Schema.Attribute.Component<'block.process-item', true>;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockBenifitsBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_benifits_blocks';
  info: {
    displayName: 'Benifits Block';
  };
  attributes: {
    benifits: Schema.Attribute.Component<'block.benifits-list', true>;
    heading: Schema.Attribute.Component<'block.heading-block', false>;
  };
}

export interface BlockBenifitsList extends Struct.ComponentSchema {
  collectionName: 'components_block_benifits_lists';
  info: {
    displayName: 'Benifits List';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockBlogBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_blog_blocks';
  info: {
    description: 'A block to showcase a selection of blog posts with a customizable heading';
    displayName: 'Blog Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    posts: Schema.Attribute.Relation<'manyToMany', 'api::blog.blog'>;
  };
}

export interface BlockButton extends Struct.ComponentSchema {
  collectionName: 'components_block_buttons';
  info: {
    description: 'A reusable button component for CTAs';
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface BlockCaseStudyBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_blocks';
  info: {
    displayName: 'CaseStudy Block';
  };
  attributes: {
    case_studies: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    >;
    heading: Schema.Attribute.Component<'block.heading-block', false>;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockCaseStudyHeroBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_hero_blocks';
  info: {
    displayName: 'CaseStudy Hero Block';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    DownloadCaseStudy: Schema.Attribute.Component<'block.button', false>;
    heading: Schema.Attribute.String;
    primaryButton: Schema.Attribute.Component<'block.button', false>;
  };
}

export interface BlockCaseStudyInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_info_blocks';
  info: {
    displayName: 'CaseStudy Info Block';
  };
  attributes: {
    Headquarters: Schema.Attribute.String;
    Industry: Schema.Attribute.String & Schema.Attribute.Required;
    published: Schema.Attribute.Date & Schema.Attribute.Required;
    testing_type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockCaseStudyMainContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_main_content_blocks';
  info: {
    displayName: 'CaseStudy Main Content Block';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface BlockCaseStudyStateBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_state_blocks';
  info: {
    displayName: 'CaseStudy State Block';
  };
  attributes: {
    stats_items: Schema.Attribute.Component<
      'block.case-study-state-item',
      true
    >;
  };
}

export interface BlockCaseStudyStateItem extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_state_items';
  info: {
    displayName: 'CaseStudy State Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockCaseStudyTechStackBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_case_study_tech_stack_blocks';
  info: {
    displayName: 'CaseStudy TechStack Block';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    tech_stacks: Schema.Attribute.Component<'block.tech-item', true>;
  };
}

export interface BlockCertificationBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_certification_blocks';
  info: {
    description: 'A block to display a gallery of certifications';
    displayName: 'Certification Block';
  };
  attributes: {
    certifications: Schema.Attribute.Component<
      'block.certification-item',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface BlockCertificationItem extends Struct.ComponentSchema {
  collectionName: 'components_block_certification_items';
  info: {
    description: 'A single certification logo and its metadata';
    displayName: 'Certification Item';
  };
  attributes: {
    altText: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.String;
  };
}

export interface BlockClientDetails extends Struct.ComponentSchema {
  collectionName: 'components_block_client_details';
  info: {
    description: 'Metadata for a client providing a testimonial';
    displayName: 'Client Details';
  };
  attributes: {
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface BlockClientStrip extends Struct.ComponentSchema {
  collectionName: 'components_block_client_strips';
  info: {
    displayName: 'Client Strip';
  };
  attributes: {
    logo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface BlockClientSuccessBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_client_success_blocks';
  info: {
    description: 'A section showcasing multiple client success stories';
    displayName: 'Client Success Block';
  };
  attributes: {
    header: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    testimonials: Schema.Attribute.Component<
      'block.client-success-item',
      true
    > &
      Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockClientSuccessItem extends Struct.ComponentSchema {
  collectionName: 'components_block_client_success_items';
  info: {
    description: 'A single client testimonial including video and text';
    displayName: 'Client Success Item';
  };
  attributes: {
    client: Schema.Attribute.Component<'block.client-details', false> &
      Schema.Attribute.Required;
    testimonial: Schema.Attribute.Blocks & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface BlockClientsLogo extends Struct.ComponentSchema {
  collectionName: 'components_block_clients_logos';
  info: {
    displayName: 'Client Stripe';
  };
  attributes: {
    Heading: Schema.Attribute.Component<'block.heading-block', false>;
    logo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface BlockClutchWidgetBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_clutch_widget_blocks';
  info: {
    displayName: 'Clutch Widget Block';
  };
  attributes: {};
}

export interface BlockCollaborationBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_collaboration_blocks';
  info: {
    displayName: 'Collaboration Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false>;
    items: Schema.Attribute.Component<'block.title-block', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 6;
        },
        number
      >;
  };
}

export interface BlockContactFormBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_contact_forms';
  info: {
    description: 'A customizable lead generation form';
    displayName: 'Contact Form';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Send Message'>;
    input_field: Schema.Attribute.Component<'block.form-field-dynamic', true> &
      Schema.Attribute.Required;
    privacyDisclaimer: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockContactFormFields extends Struct.ComponentSchema {
  collectionName: 'components_block_contact_form_fields';
  info: {
    description: 'Configuration for contact form field labels';
    displayName: 'Form Field Labels';
  };
  attributes: {
    companyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company'>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Work Email'>;
    fullNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full Name'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'How can we help?'>;
  };
}

export interface BlockCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_cta_sections';
  info: {
    description: 'A high-conversion block combining heading, stats, and a contact form';
    displayName: 'CTA Block';
  };
  attributes: {
    form: Schema.Attribute.Component<'block.contact-form-block', false> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'block.stat-item', true>;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockCtaButtonBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    button: Schema.Attribute.Component<'block.button', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockFaqBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_faq_blocks';
  info: {
    displayName: 'FAQ Block';
  };
  attributes: {
    faq: Schema.Attribute.Component<'widget.accordion', true>;
    faq_cta: Schema.Attribute.Component<'block.faq-cta', false>;
    heading: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface BlockFaqCta extends Struct.ComponentSchema {
  collectionName: 'components_block_faq_ctas';
  info: {
    displayName: 'FAQ CTA';
  };
  attributes: {
    button: Schema.Attribute.Component<'block.button', false>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFeatureBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_feature_sections';
  info: {
    description: 'A generic section for highlighting features, benefits, or advantages with various layout options';
    displayName: 'Feature Section';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    items: Schema.Attribute.Component<'block.feature-item', true> &
      Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'block.stat-item', true>;
    variant: Schema.Attribute.Enumeration<
      ['default', 'split_list', 'split_grid', 'split_icon_top', 'centered_grid']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface BlockFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_block_feature_items';
  info: {
    description: 'A generic item with an icon, title, description, and optional link';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'block.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockFormFieldDynamic extends Struct.ComponentSchema {
  collectionName: 'components_block_form_fields';
  info: {
    description: 'A dynamic input field configuration for forms';
    displayName: 'Dynamic Form Field';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'number', 'tel', 'textarea', 'select']
    > &
      Schema.Attribute.Required;
  };
}

export interface BlockGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_block_gallery_items';
  info: {
    description: 'An image for the office gallery with specific layout spanning options';
    displayName: 'Gallery Item';
  };
  attributes: {
    altText: Schema.Attribute.String & Schema.Attribute.Required;
    colSpan: Schema.Attribute.Enumeration<['1', '2', '4']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1'>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    rowSpan: Schema.Attribute.Enumeration<['1', '2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1'>;
  };
}

export interface BlockHeadingBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_section_headings';
  info: {
    description: 'A reusable heading block for page sections';
    displayName: 'Section Heading';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['center', 'left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'center'>;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.Blocks & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockHeroBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_heros';
  info: {
    description: 'Main landing page hero section';
    displayName: 'Hero Block';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    primaryButton: Schema.Attribute.Component<'block.button', false>;
    quote: Schema.Attribute.Text;
    secondaryButton: Schema.Attribute.Component<'block.button', false>;
    title: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface BlockIndustryBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_industry_blocks';
  info: {
    displayName: 'Industry Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    industries: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry.industry'
    >;
  };
}

export interface BlockLink extends Struct.ComponentSchema {
  collectionName: 'components_block_links';
  info: {
    description: 'A reusable link component with label, URL, and target';
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface BlockOfferBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_offer_sections';
  info: {
    description: 'A tabbed section to showcase different QA service offerings with detailed descriptions, features, and imagery.';
    displayName: 'Offer Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    offers: Schema.Attribute.Component<'block.offer-item', true> &
      Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['light', 'dark']>;
  };
}

export interface BlockOfferItem extends Struct.ComponentSchema {
  collectionName: 'components_block_offer_items';
  info: {
    description: 'An individual service offering within the Offer Block.';
    displayName: 'Offer Item';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    icon_list: Schema.Attribute.Component<'block.benifits-list', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    offerId: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockOfficeGalleryBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_office_gallery_blocks';
  info: {
    description: 'A grid gallery showing office images and culture';
    displayName: 'Office Gallery Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    images: Schema.Attribute.Component<'block.gallery-item', true> &
      Schema.Attribute.Required;
  };
}

export interface BlockPricingBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_pricing_blocks';
  info: {
    description: 'Container for the pricing section with a heading and multiple pricing plans';
    displayName: 'Pricing Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    plans: Schema.Attribute.Component<'block.pricing-plan', true> &
      Schema.Attribute.Required;
  };
}

export interface BlockPricingFeature extends Struct.ComponentSchema {
  collectionName: 'components_block_pricing_features';
  info: {
    description: 'A single feature item for a pricing plan';
    displayName: 'Pricing Feature';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockPricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_block_pricing_plans';
  info: {
    description: 'A single pricing card containing plan details and features';
    displayName: 'Pricing Plan';
  };
  attributes: {
    cta: Schema.Attribute.Component<'block.button', false> &
      Schema.Attribute.Required;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    features: Schema.Attribute.Component<'block.pricing-feature', true> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockProcessItem extends Struct.ComponentSchema {
  collectionName: 'components_block_process_items';
  info: {
    displayName: 'Process Item';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    no: Schema.Attribute.Integer;
    sub_block_items: Schema.Attribute.Component<
      'block.process-sub-block-item',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockProcessSubBlockItem extends Struct.ComponentSchema {
  collectionName: 'components_block_process_sub_block_items';
  info: {
    displayName: 'Process Sub Block Item';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    label: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlockProductItem extends Struct.ComponentSchema {
  collectionName: 'components_block_product_items';
  info: {
    description: 'A single product reference within a products block';
    displayName: 'Product Item';
  };
  attributes: {
    custom_label: Schema.Attribute.String;
    custom_link: Schema.Attribute.Component<'block.link', false>;
    product: Schema.Attribute.Relation<'manyToOne', 'api::product.product'>;
  };
}

export interface BlockProductsBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_products_blocks';
  info: {
    description: 'A block displaying a list of products';
    displayName: 'Products Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false>;
    products: Schema.Attribute.Component<'block.product-item', true>;
    variant: Schema.Attribute.Enumeration<['v1', 'v2', 'v3']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v1'>;
  };
}

export interface BlockServiceBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_service_blocks';
  info: {
    description: 'A section block containing a heading and a list of services';
    displayName: 'Service Block';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    services: Schema.Attribute.Component<'block.feature-item', true> &
      Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['minimal_grid', 'minimal_grid_arrow_card', 'editorial_grid']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'minimal_grid'>;
  };
}

export interface BlockServiceHero extends Struct.ComponentSchema {
  collectionName: 'components_block_service_heros';
  info: {
    description: 'Specialized hero section for service pages with a right-side image';
    displayName: 'Section Hero';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.String;
    primaryButton: Schema.Attribute.Component<'block.button', false>;
    secondaryButton: Schema.Attribute.Component<'block.button', false>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlockSocialHandles extends Struct.ComponentSchema {
  collectionName: 'components_block_social_handles';
  info: {
    displayName: 'Social Handles';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    username: Schema.Attribute.String;
  };
}

export interface BlockSplitBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_split_blocks';
  info: {
    displayName: 'Split Block';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    primaryButton: Schema.Attribute.Component<'block.button', false> &
      Schema.Attribute.Required;
    secondaryButton: Schema.Attribute.Component<'block.button', false>;
  };
}

export interface BlockStatItem extends Struct.ComponentSchema {
  collectionName: 'components_block_stat_items';
  info: {
    description: 'A numerical highlight stat';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
  };
}

export interface BlockTeamBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_team_sections';
  info: {
    description: 'Section to showcase the team members with different layout variants';
    displayName: 'Team Section';
  };
  attributes: {
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    members: Schema.Attribute.Component<'block.team-member', true> &
      Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.DefaultTo<'v2'>;
  };
}

export interface BlockTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_block_team_members';
  info: {
    description: 'Details of a team member including name, role, image and social links';
    displayName: 'Team Member';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    linkedin: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    twitter: Schema.Attribute.String;
  };
}

export interface BlockTechCategory extends Struct.ComponentSchema {
  collectionName: 'components_block_tech_categories';
  info: {
    description: 'A category of technologies (e.g., Automation Testing)';
    displayName: 'Tech Category';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    technologies: Schema.Attribute.Component<'block.tech-item', true>;
  };
}

export interface BlockTechItem extends Struct.ComponentSchema {
  collectionName: 'components_block_tech_items';
  info: {
    description: 'A single technology item with an icon and name';
    displayName: 'Tech Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTechStackBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_tech_stack_blocks';
  info: {
    description: 'A section to showcase tools and technologies grouped by category';
    displayName: 'Tech Stack Block';
  };
  attributes: {
    categories: Schema.Attribute.Component<'block.tech-category', true> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.Component<'block.heading-block', false> &
      Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['v1', 'v2']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'v2'>;
  };
}

export interface BlockTitleBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockTrustBuildingBlock extends Struct.ComponentSchema {
  collectionName: 'components_block_trust_building_blocks';
  info: {
    displayName: 'Trust Building Block';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'block.stat-item', true>;
    title: Schema.Attribute.Text;
  };
}

export interface LinksFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_links_featured_cards';
  info: {
    description: 'A highlighted card at the bottom of a menu';
    displayName: 'Featured Card';
  };
  attributes: {
    actionText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksNavItem extends Struct.ComponentSchema {
  collectionName: 'components_links_nav_items';
  info: {
    description: 'Top-level menu category';
    displayName: 'Nav Item';
  };
  attributes: {
    featured: Schema.Attribute.Component<'links.featured-card', true>;
    sections: Schema.Attribute.Component<'links.nav-section', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksNavLink extends Struct.ComponentSchema {
  collectionName: 'components_links_nav_links';
  info: {
    description: 'An individual navigation link';
    displayName: 'Nav Link';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksNavSection extends Struct.ComponentSchema {
  collectionName: 'components_links_nav_sections';
  info: {
    description: 'A group of navigation links';
    displayName: 'Nav Section';
  };
  attributes: {
    links: Schema.Attribute.Component<'links.nav-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMetaData extends Struct.ComponentSchema {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'Meta data';
    icon: 'bulletList';
  };
  attributes: {
    canonical_url: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    keywords: Schema.Attribute.Relation<'oneToMany', 'api::keyword.keyword'>;
    og: Schema.Attribute.Component<'seo.og', false> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoOg extends Struct.ComponentSchema {
  collectionName: 'components_seo_ogs';
  info: {
    displayName: 'Og';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsContactItem extends Struct.ComponentSchema {
  collectionName: 'components_utils_contact_items';
  info: {
    description: 'A single contact detail with an icon and value';
    displayName: 'Contact Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    icon_name: Schema.Attribute.String;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsFooter extends Struct.ComponentSchema {
  collectionName: 'components_utils_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    certification_items: Schema.Attribute.Component<
      'block.certification-item',
      true
    >;
    description: Schema.Attribute.Text;
    Headquarters: Schema.Attribute.Component<'utils.headquarters', true>;
    logo: Schema.Attribute.Component<'utils.logo', false>;
    social_handles: Schema.Attribute.Component<'block.social-handles', true>;
  };
}

export interface UtilsHeadquarters extends Struct.ComponentSchema {
  collectionName: 'components_utils_headquarters';
  info: {
    displayName: 'Headquarters';
  };
  attributes: {
    address: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'A-904, Ganesh Glory 11, Jagatpur, Ahmedabad, Gujarat 382470, INDIA'>;
    contact_details: Schema.Attribute.Component<'utils.contact-item', true>;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface UtilsLogo extends Struct.ComponentSchema {
  collectionName: 'components_utils_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface UtilsMenuItems extends Struct.ComponentSchema {
  collectionName: 'components_utils_menu_items';
  info: {
    displayName: 'Menu Items';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsTopBar extends Struct.ComponentSchema {
  collectionName: 'components_utils_top_bars';
  info: {
    description: 'Configuration for the topmost bar of the website';
    displayName: 'Top Bar';
  };
  attributes: {
    contact_details: Schema.Attribute.Component<'utils.contact-item', true>;
    social_links: Schema.Attribute.Component<'block.social-handles', true>;
  };
}

export interface WidgetAccordion extends Struct.ComponentSchema {
  collectionName: 'components_widget_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    item: Schema.Attribute.Component<'block.title-block', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 2;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.ai-advantage-block': BlockAiAdvantageBlock;
      'block.automation-process': BlockAutomationProcess;
      'block.benifits-block': BlockBenifitsBlock;
      'block.benifits-list': BlockBenifitsList;
      'block.blog-block': BlockBlogBlock;
      'block.button': BlockButton;
      'block.case-study-block': BlockCaseStudyBlock;
      'block.case-study-hero-block': BlockCaseStudyHeroBlock;
      'block.case-study-info-block': BlockCaseStudyInfoBlock;
      'block.case-study-main-content-block': BlockCaseStudyMainContentBlock;
      'block.case-study-state-block': BlockCaseStudyStateBlock;
      'block.case-study-state-item': BlockCaseStudyStateItem;
      'block.case-study-tech-stack-block': BlockCaseStudyTechStackBlock;
      'block.certification-block': BlockCertificationBlock;
      'block.certification-item': BlockCertificationItem;
      'block.client-details': BlockClientDetails;
      'block.client-strip': BlockClientStrip;
      'block.client-success-block': BlockClientSuccessBlock;
      'block.client-success-item': BlockClientSuccessItem;
      'block.clients-logo': BlockClientsLogo;
      'block.clutch-widget-block': BlockClutchWidgetBlock;
      'block.collaboration-block': BlockCollaborationBlock;
      'block.contact-form-block': BlockContactFormBlock;
      'block.contact-form-fields': BlockContactFormFields;
      'block.cta-block': BlockCtaBlock;
      'block.cta-button-block': BlockCtaButtonBlock;
      'block.faq-block': BlockFaqBlock;
      'block.faq-cta': BlockFaqCta;
      'block.feature-block': BlockFeatureBlock;
      'block.feature-item': BlockFeatureItem;
      'block.form-field-dynamic': BlockFormFieldDynamic;
      'block.gallery-item': BlockGalleryItem;
      'block.heading-block': BlockHeadingBlock;
      'block.hero-block': BlockHeroBlock;
      'block.industry-block': BlockIndustryBlock;
      'block.link': BlockLink;
      'block.offer-block': BlockOfferBlock;
      'block.offer-item': BlockOfferItem;
      'block.office-gallery-block': BlockOfficeGalleryBlock;
      'block.pricing-block': BlockPricingBlock;
      'block.pricing-feature': BlockPricingFeature;
      'block.pricing-plan': BlockPricingPlan;
      'block.process-item': BlockProcessItem;
      'block.process-sub-block-item': BlockProcessSubBlockItem;
      'block.product-item': BlockProductItem;
      'block.products-block': BlockProductsBlock;
      'block.service-block': BlockServiceBlock;
      'block.service-hero': BlockServiceHero;
      'block.social-handles': BlockSocialHandles;
      'block.split-block': BlockSplitBlock;
      'block.stat-item': BlockStatItem;
      'block.team-block': BlockTeamBlock;
      'block.team-member': BlockTeamMember;
      'block.tech-category': BlockTechCategory;
      'block.tech-item': BlockTechItem;
      'block.tech-stack-block': BlockTechStackBlock;
      'block.title-block': BlockTitleBlock;
      'block.trust-building-block': BlockTrustBuildingBlock;
      'links.featured-card': LinksFeaturedCard;
      'links.nav-item': LinksNavItem;
      'links.nav-link': LinksNavLink;
      'links.nav-section': LinksNavSection;
      'seo.meta-data': SeoMetaData;
      'seo.og': SeoOg;
      'utils.contact-item': UtilsContactItem;
      'utils.footer': UtilsFooter;
      'utils.headquarters': UtilsHeadquarters;
      'utils.logo': UtilsLogo;
      'utils.menu-items': UtilsMenuItems;
      'utils.top-bar': UtilsTopBar;
      'widget.accordion': WidgetAccordion;
    }
  }
}
