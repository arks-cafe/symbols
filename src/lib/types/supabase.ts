export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			posts: {
				Row: {
					author_id: string;
					created_at: string | null;
					file_id: string;
					id: string;
					name: string;
					thumbnail_id: string;
				};
				Insert: {
					author_id: string;
					created_at?: string | null;
					file_id: string;
					id?: string;
					name: string;
					thumbnail_id: string;
				};
				Update: {
					author_id?: string;
					created_at?: string | null;
					file_id?: string;
					id?: string;
					name?: string;
					thumbnail_id?: string;
				};
			};
			profiles: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: string;
					modified_at: string | null;
					name: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id: string;
					modified_at?: string | null;
					name?: string | null;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: string;
					modified_at?: string | null;
					name?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
