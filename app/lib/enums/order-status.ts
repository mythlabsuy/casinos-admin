export enum OrderStatus {
  ORDER_CREATED = 0,
  ORDER_ACCEPTED = 1,
  ORDER_DRAFTED = 2,

  PAYMENT_PENDING = 20,
  PAYMENT_CONFIRMED = 21,

  PACKAGING_IN_PROGRESS = 30,
  OUT_OF_STOCK_REVIEW = 31,
  ORDER_STOCK_UPDATED = 32,
  READY_FOR_SHIPPING = 33,

  DELIVERED_TO_CARRIER = 40,
  EN_ROUTE_TO_DELIVERY = 41,
  SCHEDULED_DELIVERY = 42,
  SUCCESSFULLY_DELIVERED = 43,

  CUSTOMER_ACCEPTANCE = 50,
  RETURN_REQUESTED = 51,
  RETURN_APPROVED = 52,
  REFUND_PROCESSED = 53,

  ORDER_CANCELED = 90,
  ORDER_REJECTED = 91,
  ORDER_EXPIRED = 92,
}

const OrderStatusStrings: {
  [key in OrderStatus]: {
    [locale: string]: string;
  };
} = {
  [OrderStatus.ORDER_CREATED]: {
    en: "Order Created",
    es: "Orden Creada",
    fr: "Commande Créée",
  },
  [OrderStatus.ORDER_ACCEPTED]: {
    en: "Order Accepted",
    es: "Orden Aceptada",
    fr: "Commande Acceptée",
  },
  [OrderStatus.ORDER_DRAFTED]: {
    en: "Order Drafted",
    es: "Borrador",
    fr: "Commande Ébauchée",
  },
  [OrderStatus.PAYMENT_PENDING]: {
    en: "Payment Pending",
    es: "Pago Pendiente",
    fr: "Paiement en Attente",
  },
  [OrderStatus.PAYMENT_CONFIRMED]: {
    en: "Payment Confirmed",
    es: "Pago Confirmado",
    fr: "Paiement Confirmé",
  },
  [OrderStatus.PACKAGING_IN_PROGRESS]: {
    en: "Packaging In Progress",
    es: "Empaquetado en Proceso",
    fr: "Emballage en Cours",
  },
  [OrderStatus.OUT_OF_STOCK_REVIEW]: {
    en: "Out of Stock Review",
    es: "Revisión por Falta de Stock",
    fr: "Révision de Rupture de Stock",
  },
  [OrderStatus.ORDER_STOCK_UPDATED]: {
    en: "Order Stock Updated",
    es: "Stock de Orden Actualizado",
    fr: "Stock de la Commande Mis à Jour",
  },
  [OrderStatus.READY_FOR_SHIPPING]: {
    en: "Ready for Shipping",
    es: "Listo para Envío",
    fr: "Prêt pour l'Expédition",
  },
  [OrderStatus.DELIVERED_TO_CARRIER]: {
    en: "Delivered to Carrier",
    es: "Entregado al Transportista",
    fr: "Livré au Transporteur",
  },
  [OrderStatus.EN_ROUTE_TO_DELIVERY]: {
    en: "En Route to Delivery",
    es: "En Camino a la Entrega",
    fr: "En Route pour la Livraison",
  },
  [OrderStatus.SCHEDULED_DELIVERY]: {
    en: "Scheduled for Delivery",
    es: "Entrega Programada",
    fr: "Livraison Planifiée",
  },
  [OrderStatus.SUCCESSFULLY_DELIVERED]: {
    en: "Successfully Delivered",
    es: "Entregado Exitosamente",
    fr: "Livré avec Succès",
  },
  [OrderStatus.CUSTOMER_ACCEPTANCE]: {
    en: "Customer Acceptance",
    es: "Aceptación del Cliente",
    fr: "Acceptation par le Client",
  },
  [OrderStatus.RETURN_REQUESTED]: {
    en: "Return Requested",
    es: "Devolución Solicitada",
    fr: "Retour Demandé",
  },
  [OrderStatus.RETURN_APPROVED]: {
    en: "Return Approved",
    es: "Devolución Aprobada",
    fr: "Retour Approuvé",
  },
  [OrderStatus.REFUND_PROCESSED]: {
    en: "Refund Processed",
    es: "Reembolso Procesado",
    fr: "Remboursement Traité",
  },
  [OrderStatus.ORDER_CANCELED]: {
    en: "Order Canceled",
    es: "Orden Cancelada",
    fr: "Commande Annulée",
  },
  [OrderStatus.ORDER_REJECTED]: {
    en: "Order Rejected",
    es: "Orden Rechazada",
    fr: "Commande Rejetée",
  },
  [OrderStatus.ORDER_EXPIRED]: {
    en: "Order Expired",
    es: "Orden Expirada",
    fr: "Commande Expirée",
  },
};

// Function to get the localized string
export function getOrderStatusString(status: OrderStatus, locale: string = 'en'): string {
  return OrderStatusStrings[status][locale] || OrderStatusStrings[status]['en'];
}

/**
 * Returns a Map <string,string>, being the key of the map the string representation for the
 * Order status and the value of the map is the numeric value of the enum as a string.
 * 
 * @param locale Selected language. Current accepted values: es, en, fr.
 * @returns 
 */
export function getOrderStatusMap(locale: string = 'en'): Map<string, string> {
  const orderStatusMap = new Map<string, string>();

  Object.entries(OrderStatusStrings).forEach(([key, value]) => {
    // Add the status and its localized string to the map
    orderStatusMap.set(value[locale] || value['en'], key); // Fallback to 'en' if locale not available
  });

  return orderStatusMap;
}