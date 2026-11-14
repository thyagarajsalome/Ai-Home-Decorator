/**
 * Google Merchant Listings & Schema.org Compliant Product Structured Data Helper
 * Resolves Google Search Console requirements for:
 * 1. shippingDetails (in offers)
 * 2. hasMerchantReturnPolicy (in offers)
 * 3. Global identifier / brand / sku / mpn
 */

export interface ProductSchemaInput {
  title: string;
  subtitle?: string;
  description?: string;
  slug: string;
  price: number;
  pagesCount?: number;
  coverImage: string;
}

export function buildProductJsonLd(product: ProductSchemaInput) {
  const identifier = `AIHD-${product.slug.toUpperCase()}`;

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Book"],
    name: product.title,
    description: product.description || product.subtitle || product.title,
    image: [product.coverImage],
    bookFormat: "https://schema.org/EBook",
    numberOfPages: product.pagesCount,
    inLanguage: "en-US",
    sku: identifier,
    mpn: identifier,
    brand: {
      "@type": "Brand",
      name: "AI Home Decorator",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Home Decorator",
      url: "https://aihomedecorator.com",
      logo: "https://aihomedecorator.com/brand/logo.jpg",
    },
    offers: {
      "@type": "Offer",
      url: `https://aihomedecorator.com/store/${product.slug}`,
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnOnline",
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund",
      },
    },
  };
}
