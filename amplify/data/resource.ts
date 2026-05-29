import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Sermon: a
    .model({
      title:     a.string().required(),
      speaker:   a.string().required(),
      date:      a.string().required(),
      scripture: a.string().required(),
      series:    a.string().required(),
      duration:  a.string().required(),
      audioUrl:  a.string(),
      videoUrl:  a.string(),
      published: a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  Event: a
    .model({
      title:       a.string().required(),
      day:         a.string().required(),
      month:       a.string().required(),
      time:        a.string().required(),
      location:    a.string().required(),
      description: a.string().required(),
      category:    a.string().required(),
      published:   a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  ContactSubmission: a
    .model({
      name:    a.string().required(),
      email:   a.string().required(),
      subject: a.string().required(),
      message: a.string().required(),
      read:    a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["create"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  HeroSlide: a
    .model({
      eyebrow:        a.string().required(),
      headingLine1:   a.string().required(),
      headingLine2:   a.string().required(),
      sub:            a.string().required(),
      imageUrl:       a.string().required(),
      primaryLabel:   a.string().required(),
      primaryHref:    a.string().required(),
      secondaryLabel: a.string().required(),
      secondaryHref:  a.string().required(),
      order:          a.integer().required(),
      active:         a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  Ministry: a
    .model({
      name:       a.string().required(),
      commission: a.string().required(),
      tagline:    a.string().required(),
      description: a.string().required(),
      fellowship: a.string().required(),
      icon:       a.string().required(),
      order:      a.integer().required(),
      published:  a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  Leader: a
    .model({
      name:      a.string().required(),
      role:      a.string().required(),
      bio:       a.string(),
      imageUrl:  a.string(),
      order:     a.integer().required(),
      published: a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  ServiceTime: a
    .model({
      day:         a.string().required(),
      time:        a.string().required(),
      name:        a.string().required(),
      description: a.string(),
      duration:    a.string(),
      order:       a.integer().required(),
      published:   a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
