module.exports = {
  $id: "http://example.com/schema/onConfirmSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
        },
        location: {
          type: "object",
          properties: {
            city: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
              },
              required: ["code"],
            },
            country: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
              },
              required: ["code"],
            },
          },
          required: ["city", "country"],
        },
        action: {
          type: "string",
          const: "on_confirm",
        },
        version: {
          type: "string",
          const: "2.0.0",
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
        },
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
        },
        transaction_id: {
          type: "string",
          const: { $data: "/select/0/context/transaction_id" },
          errorMessage:
            "Transaction ID should be same across the transaction: ${/select/0/context/transaction_id}",
        },
        message_id: {
          type: "string",
          allOf: [
            {
              const: { $data: "/confirm/0/context/message_id" },
              errorMessage:
                "Message ID for on_action API should be same as action API: ${/select/0/context/message_id}",
            },
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage:
                "Message ID should not be equal to transaction_id: ${1/transaction_id}",
            },
          ],
        },
        timestamp: {
          type: "string",
        },
        ttl: {
          type: "string",
          const:"PT30S"
        },
      },
      required: [
        "domain",
        "location",
        "action",
        "version",
        "bap_id",
        "bap_uri",
        "bpp_id",
        "bpp_uri",
        "transaction_id",
        "message_id",
        "timestamp",
        "ttl",
      ],
    },
    message: {
      type: "object",
      properties: {
        order: {
          type: "object",
          properties: {
            id: {
              type: "string",
              const: { $data: "/confirm/0/message/order/id" },
            },
            status: {
              type: "string",
              enum: ["CREATED", "ACCEPTED", "CANCELLED"],
            },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                    },
                    required: ["id"],
                  },
                },
                rateable: {
                  type: "boolean",
                },
              },
              required: ["id", "locations", "rateable"],
            },
            items: {
              $ref: "onSelectSchema#/properties/message/properties/order/properties/items",
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/name" },
                },
                address: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/address" },
                },
                state: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/state/name",
                      },
                    },
                  },
                  required: ["name"],
                },
                city: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      const: {
                        $data: "/init/0/message/order/billing/city/name",
                      },
                    },
                  },
                  required: ["name"],
                },
                tax_id: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/tax_id" },
                },
                email: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/email" },
                },
                phone: {
                  type: "string",
                  const: { $data: "/init/0/message/order/billing/phone" },
                },
              },

              required: ["name", "address", "state", "city", "phone"],
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  type: {
                    type: "string",
                  },
                  tracking: {
                    type: "boolean",
                  },
                  stops: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        location: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            descriptor: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["name"],
                            },
                            gps: {
                              type: "string",
                            },
                            address: {
                              type: "string",
                            },
                            city: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["name"],
                            },
                            country: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                              },
                              required: ["code"],
                            },
                            area_code: {
                              type: "string",
                            },
                            state: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["name"],
                            },
                          },
                          required: ["gps"],
                        },
                        time: {
                          type: "object",
                          properties: {
                            range: {
                              type: "object",
                              properties: {
                                start: {
                                  type: "string",
                                },
                                end: {
                                  type: "string",
                                },
                              },
                              required: ["start", "end"],
                            },
                          },
                          required: ["range"],
                        },
                        contact: {
                          type: "object",
                          properties: {
                            phone: {
                              type: "string",
                            },
                            email: {
                              type: "string",
                            },
                          },
                          required: ["phone", "email"],
                        },
                        person: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                          },
                          required: ["name"],
                        },
                      },
                      if: { properties: { type: { const: "end" } } },
                      then: {
                        required: [
                          "type",
                          "location",
                          "contact",
                          "time"
                        ],
                      },
                      else: { required: ["type"] },
                    },
                  },
                  rateable: {
                    type: "boolean",
                  },
                },
                required: [
                  "id",
                  "state",
                  "type",
                  "stops",
                  "tracking",
                  "rateable",
                ],
              },
            },
            cancellation_terms: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  fulfillment_state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  cancel_by: {
                    type: "object",
                    properties: {
                      duration: {
                        type: "string",
                      },
                    },
                    required: ["duration"],
                  },
                  cancellation_fee: {
                    type: "object",
                    properties: {
                      amount: {
                        type: "object",
                        properties: {
                          value: {
                            type: "string",
                          },
                        },
                        required: ["value"],
                      },
                      percentage: {
                        type: "string",
                      },
                    },
                  },
                  reason_required: {
                    type: "boolean",
                  },
                },
                required: [
                  "fulfillment_state",
                  "cancel_by",
                  "cancellation_fee",
                  "reason_required",
                ],
              },
            },

            quote: {
              type: "object",
              properties: {
                price: {
                  type: "object",
                  properties: {
                    currency: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["currency", "value"],
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                      },
                      price: {
                        type: "object",
                        properties: {
                          currency: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                        },
                        required: ["currency", "value"],
                      },
                      item: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          quantity: {
                            type: "object",
                            properties: {
                              selected: {
                                type: "object",
                                properties: {
                                  count: {
                                    type: "integer",
                                  },
                                },
                                required: ["count"],
                              },
                            },
                          },
                          price: {
                            type: "object",
                            properties: {
                              currency: {
                                type: "string",
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["currency", "value"],
                          },
                        },
                        required: ["id"],
                      },
                      tags: {
                        type: "array",
                        items: [
                          {
                            type: "object",
                            properties: {
                              descriptor: {
                                type: "object",
                                properties: {
                                  code: {
                                    type: "string",
                                  },
                                },
                                required: ["code"],
                              },
                              list: {
                                type: "array",
                                items: [
                                  {
                                    type: "object",
                                    properties: {
                                      descriptor: {
                                        type: "object",
                                        properties: {
                                          code: {
                                            type: "string",
                                          },
                                        },
                                        required: ["code"],
                                      },
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["descriptor", "value"],
                                  },
                                ],
                              },
                            },
                            required: ["descriptor", "list"],
                          },
                        ],
                      },
                    },
                    required: ["title", "price", "item", "tags"],
                  },
                },
                ttl: {
                  type: "string",
                },
              },
              isQuoteMatching: true,
              required: ["price", "breakup", "ttl"],
            },
            payments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  collected_by: {
                    type: "string",
                    enum: ["BAP", "BPP"],
                  },
                  params: {
                    type: "object",
                    properties: {
                      amount: {
                        type: "string",
                      },
                      currency: {
                        type: "string",
                      },
                      transaction_id: {
                        type: "string",
                      },
                      bank_account_number: {
                        type: "string",
                      },
                      virtual_payment_address: {
                        type: "string",
                      },
                    },
                    required: [
                      "amount",
                      "currency",
                      "transaction_id",
                      "bank_account_number",
                      "virtual_payment_address",
                    ],
                  },
                  status: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    const: { $data: "/select/0/message/order/payments/0/type" },
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        descriptor: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                          },
                          required: ["code"],
                        },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              descriptor: {
                                type: "object",
                                properties: {
                                  code: {
                                    type: "string",
                                  },
                                },
                                required: ["code"],
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["descriptor", "value"],
                          },
                        },
                      },
                      required: ["descriptor", "list"],
                    },
                  },
                },
                required: [
                  "id",
                  "collected_by",
                  "params",
                  "status",
                  "type",
                  "tags",
                ],
              },
            },
            created_at: {
              type: "string",
              format: "date-time",
              const: { $data: "/confirm/0/message/order/created_at" },
              errorMessage:
                "should remain same as in /confirm - ${/confirm/0/message/order/created_at}",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              not: { const: { $data: "/confirm/0/message/order/created_at" } },
              errorMessage: "should not be same as 'created_at'",
            },
            xinput: {
              type: "object",
              properties: {
                form: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                    },
                    mimetype: {
                      type: "string",
                    },
                    submission_id: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                  },
                  required: ["url", "mimetype", "submission_id", "status"],
                },
              },
              required: ["form"],
            },
          },
          required: [
            "id",
            "status",
            "provider",
            "items",
            "billing",
            "cancellation_terms",
            "fulfillments",
            "quote",
            "payments",
            "created_at",
            "updated_at"
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};
