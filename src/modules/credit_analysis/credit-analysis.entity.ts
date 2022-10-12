import { 
	Column, 
	CreateDateColumn, 
	Entity, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn,
} from "typeorm"
import { CreditAnalysisResult } from "./credit-analysis-result.enum"

@Entity('credit_analysis')
export class UsersEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string

	@Column({ type: 'enum', enum: CreditAnalysisResult, nullable: false })
	public result: string

	@CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
	public createdAt: Date

	@UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: false })
	public updatedAt: Date
}