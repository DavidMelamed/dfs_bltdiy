import { dataForSEOService } from '@services/api/dataForSeo';
import type { DomainAnalyticsResult, DomainTechnologiesResult, DomainComparisonResult } from '@types/domainAnalytics';

class DomainAnalyticsService {
  async getDomainOverview(domain: string): Promise<DomainAnalyticsResult> {
    try {
      const response = await dataForSEOService.post('/domain_analytics/overview', [{
        target: domain,
        limit: 10
      }]);

      return this.transformOverviewResponse(response.tasks[0].result[0]);
    } catch (error) {
      throw new Error('Failed to fetch domain overview');
    }
  }

  async getDomainTechnologies(domain: string): Promise<DomainTechnologiesResult> {
    try {
      const response = await dataForSEOService.post('/domain_analytics/technologies', [{
        target: domain,
        limit: 100
      }]);

      return {
        technologies: response.tasks[0].result[0].technologies || []
      };
    } catch (error) {
      throw new Error('Failed to fetch domain technologies');
    }
  }

  async compareDomains(domains: string[]): Promise<DomainComparisonResult> {
    try {
      const response = await dataForSEOService.post('/domain_analytics/domain_intersection', [{
        targets: domains,
        limit: 100,
        include_subdomains: true
      }]);

      const result = response.tasks[0].result[0];
      return {
        domains: domains,
        common_keywords: result.intersection_keywords || [],
        common_backlinks: result.intersection_backlinks || []
      };
    } catch (error) {
      throw new Error('Failed to compare domains');
    }
  }

  private transformOverviewResponse(data: any): DomainAnalyticsResult {
    return {
      domain: data.target,
      metrics: {
        organic_traffic: data.organic_traffic || 0,
        organic_keywords: data.organic_keywords || 0,
        backlinks_total: data.backlinks_total || 0,
        referring_domains: data.referring_domains || 0,
        domain_rank: data.domain_rank || 0
      },
      competitors: (data.competitors || []).map((comp: any) => ({
        domain: comp.domain,
        common_keywords: comp.common_keywords,
        domain_rank: comp.domain_rank
      })),
      keywords_data: (data.keywords_data || []).map((kw: any) => ({
        keyword: kw.keyword,
        position: kw.position,
        search_volume: kw.search_volume,
        traffic: kw.traffic,
        traffic_cost: kw.traffic_cost,
        cpc: kw.cpc
      })),
      backlinks_summary: {
        total_backlinks: data.backlinks_summary?.total_backlinks || 0,
        referring_domains: data.backlinks_summary?.referring_domains || 0,
        referring_ips: data.backlinks_summary?.referring_ips || 0,
        referring_subnets: data.backlinks_summary?.referring_subnets || 0,
        new_backlinks_24h: data.backlinks_summary?.new_backlinks_24h || 0,
        lost_backlinks_24h: data.backlinks_summary?.lost_backlinks_24h || 0,
        dofollow_backlinks: data.backlinks_summary?.dofollow_backlinks || 0,
        nofollow_backlinks: data.backlinks_summary?.nofollow_backlinks || 0
      },
      technologies: (data.technologies || []).map((tech: any) => ({
        name: tech.name,
        category: tech.category,
        first_seen: tech.first_seen,
        last_seen: tech.last_seen
      }))
    };
  }
}

export const domainAnalytics = new DomainAnalyticsService();
