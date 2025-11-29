const sources = [
    {
        "sourceType": "user",
        "fetch": "/api/__sitemap__/urls"
    },
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/"
            },
            {
                "loc": "/feed"
            },
            {
                "loc": "/about"
            },
            {
                "loc": "/legal/terms"
            },
            {
                "loc": "/auth/sign-in"
            },
            {
                "loc": "/people"
            },
            {
                "loc": "/search"
            },
            {
                "loc": "/legal/privacy"
            },
            {
                "loc": "/stories"
            },
            {
                "loc": "/discover"
            },
            {
                "loc": "/admin/dashboard"
            },
            {
                "loc": "/companies"
            },
            {
                "loc": "/solutions"
            },
            {
                "loc": "/admin/people/new"
            },
            {
                "loc": "/industries"
            },
            {
                "loc": "/admin/stories/new"
            },
            {
                "loc": "/admin/people"
            },
            {
                "loc": "/admin/companies/new"
            },
            {
                "loc": "/admin/stories"
            },
            {
                "loc": "/admin/companies"
            },
            {
                "loc": "/submit-solution"
            },
            {
                "loc": "/admin/submissions"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
