export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			posts: {
				Row: {
					author_id: string;
					created_at: string | null;
					file_path: string;
					id: number;
					json_raw: Json;
					name: string;
					thumbnail_path: string;
				};
				Insert: {
					author_id: string;
					created_at?: string | null;
					file_path: string;
					id?: number;
					json_raw: Json;
					name: string;
					thumbnail_path: string;
				};
				Update: {
					author_id?: string;
					created_at?: string | null;
					file_path?: string;
					id?: number;
					json_raw?: Json;
					name?: string;
					thumbnail_path?: string;
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
