import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from 'src/services/service-constants'

export const storiesApi = createApi({
	reducerPath: 'storiesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			// if(Cookies.get('userData')){
			// 	headers.set('authorization', `Basic ${Cookies.get('userData')}`)
			// }
			return headers
		},
	}),
	// tagTypes: [TAG_TYPES.CATEGORIES, TAG_TYPES.CURRENCIES, TAG_TYPES.SPENDINGS],
	endpoints: (builder) => ({
		getLatestStories: builder.query({
			query: () => ({
				url: '/v0/newstories.json?print=pretty',
				method: 'GET',
			})
		}),
	}),
})

export const {useLazyGetLatestStoriesQuery } = storiesApi