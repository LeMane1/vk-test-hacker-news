import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from 'src/services/service-constants'
import { IComment } from 'src/models/models'

export const commentsApi = createApi({
	reducerPath: 'commentsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		getCommentInfo: builder.query<IComment, number>({
			query: (id: number | undefined) => ({
				url: `v0/item/${id}.json?print=pretty`,
				method: 'GET'
			})
		})
	}),
})

export const { useGetCommentInfoQuery } = commentsApi