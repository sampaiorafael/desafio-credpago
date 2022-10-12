import { 
	Column, 
	CreateDateColumn, 
	Entity, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn,
} from "typeorm"
import { CreditAnalysisResult } from "./credit-analysis-result.enum"

@Entity('credit_analysis')
export class CreditAnalysisEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string

	@Column({ type: 'char', length: '11', nullable: false })
	public cpf: string

	@Column({ nullable: false })
	public score: number

	@Column({ type: 'enum', enum: CreditAnalysisResult, nullable: false })
	public result: string

	@CreateDateColumn({ name: 'created_at', type: 'timestamptz', nullable: false })
	public createdAt: Date

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: false })
	public updatedAt: Date
}