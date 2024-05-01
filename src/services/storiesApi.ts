import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from 'src/services/service-constants'
import { IStory } from 'src/models/models'

export const storiesApi = createApi({
	reducerPath: 'storiesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		getLatestStoriesId: builder.query({
			query: () => ({
				 	url: '/v0/newstories.json?print=pretty',
				 	method: 'GET',
			 }),
		}),
		getStoryInfo: builder.query<IStory, number>({
			query: (id: number | undefined) => ({
				url: `v0/item/${id}.json?print=pretty`,
				method: 'GET'
			})
		})
	}),
})

export const {useGetLatestStoriesIdQuery, useGetStoryInfoQuery } = storiesApi