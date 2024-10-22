export enum EqualityRelation {
	Equal = "Equal",
	Partial = "Partial",
	Disjoint = "Disjoint"
}

export function getEqualityRelation<T>(lhs: T, rhs: T): EqualityRelation {
	return lhs === rhs ? EqualityRelation.Equal : EqualityRelation.Disjoint;
}

export function getNumericalEqualityRelationWithinRange(lhs: number, rhs: number, range: number): EqualityRelation {
	return lhs === rhs ? EqualityRelation.Equal : Math.abs(lhs - rhs) <= range ? EqualityRelation.Partial : EqualityRelation.Disjoint;
}

function areListsEqual<T>(lhs: T[], rhs: T[]): boolean {
	if (lhs.length !== rhs.length) {
		return false;
	}

	const sortedLhs = [...lhs].sort();
	const sortedRhs = [...rhs].sort();

	for (let i = 0; i < sortedLhs.length; i++) {
		if (sortedLhs[i] !== sortedRhs[i]) {
			return false;
		}
	}

	return true;
}

function areListsDisjoint<T>(lhs: T[], rhs: T[]): boolean {
	const lhsSet = new Set(lhs);

	for (const rhsItem of rhs) {
		if (lhsSet.has(rhsItem)) {
			return false;
		}
	}

	return true;
}

export function getListEqualityRelation<T>(lhs: T[], rhs: T[]): EqualityRelation {
	if (areListsEqual(lhs, rhs)) {
		return EqualityRelation.Equal;
	}
	if (areListsDisjoint(lhs, rhs)) {
		return EqualityRelation.Disjoint;
	}

	return EqualityRelation.Partial;
}
